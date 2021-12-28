import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import { saveAs } from "file-saver";

function PassDetails(props){

  const location = useLocation();
  let history = useHistory();

  const [pass, setPass] = useState({});
  const [isPass, setIsPass] = useState(false);

  const loggedInUser = localStorage.getItem("userData");

  useEffect(() => {

      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };

        axios.get(`http://localhost:5000/pass/user/${foundUser.user._id}`, config).then(res => {
          console.log(res.data[0]);
          if(res.data.length>0){
            if(res.data[0].status!=="Deleted"){
              setPass(res.data[0]);
              setIsPass(true);
            }
          }
          }).catch((error) => {
          history.push("/");
        });
      }
      else{
        history.push("/");
      }
  }, [history]);

  function getIssueDate(){
    let date_ob = new Date();
    date_ob.setDate(date_ob.getDate() + 1);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    date = date + "-" + month + "-" + year;
    return date;
  }

  function getExpiryDate(num){
     let date_ob = new Date();
     date_ob.setDate(date_ob.getDate() + num + 1);
     let date = ("0" + date_ob.getDate()).slice(-2);
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
     let year = date_ob.getFullYear();
     date = date + "-" + month + "-" + year;
     return date;
   }

   function reApply(id){

     if (loggedInUser) {
       const foundUser = JSON.parse(loggedInUser);

       const config = {
         headers: { "Authorization": "Bearer " + foundUser.token }
       };

       var change = {
                     "status": "Deleted"
                   };

       axios.patch(`http://localhost:5000/pass/${id}`, change, config).then(response => {
           console.log(response.data);
           setPass({});
           setIsPass(false);
       });
     }
     else{
       history.push("/");
     }
   }

   async function displayRazorpay(amt, id, duration) {
     const foundUser = JSON.parse(loggedInUser);

     const config = {
       headers: { "Authorization": "Bearer " + foundUser.token }
     };

     var body = {amt: amt};
     axios.post("http://localhost:5000/payment/razorpay", body).then(response => {
       const options = {
         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
         currency: response.data.currency,
         amount: response.data.amount,
         name: "Reservation System",
         description: "Pay and book your ticket",
         order_id: response.data.id,
         handler: function (res) {
           var expiryDate = duration==="1 Month" ? getExpiryDate(30) : getExpiryDate(90);
           var change = {
                         "payment": "Done",
                         "dateOfIssue": getIssueDate(),
                         "dateOfExpiry": expiryDate
                         }
                         axios.patch(`http://localhost:5000/pass/${id}`, change, config).then(response => {
                             console.log(response.data);
                             axios.get(`http://localhost:5000/pass/user/${foundUser.user._id}`, config).then(res => {
                               console.log(res.data[0]);
                               if(res.data.length>0){
                                 setIsPass(true);
                                 setPass(res.data[0]);
                               }
                               }).catch((error) => {
                               history.push("/");
                             });
                           });
           alert("Payment Successful!");
           history.push('/userHome');
         },
       };
       const paymentObject = new window.Razorpay(options);
       paymentObject.open();
     });
   }

  return (
    <div>
    <Header />
    {isPass ?
      <div className="table-responsive" style={{padding:"25px"}}>
      <table className="table table-hover table-light">
        <thead>
          {pass.isStudent ?
            <tr className="bg-dark">
              <th style={{color:"#ffffff"}}>College ID</th>
              <th style={{color:"#ffffff"}}>Student Name</th>
              <th style={{color:"#ffffff"}}>Email</th>
              <th style={{color:"#ffffff"}}>Contact Number</th>
              <th style={{color:"#ffffff"}}>Age</th>
              <th style={{color:"#ffffff"}}>Gender</th>
              <th style={{color:"#ffffff"}}>Source</th>
              <th style={{color:"#ffffff"}}>Destination</th>
              <th style={{color:"#ffffff"}}>Class</th>
              <th style={{color:"#ffffff"}}>Duration</th>
              <th style={{color:"#ffffff"}}>Total Cost</th>
              <th style={{color:"#ffffff"}}>Status</th>
              {pass.status==="Rejected" &&
              <th style={{color:"#ffffff"}}>Re-Apply</th>
              }
              {pass.status==="Approved" &&
              <th style={{color:"#ffffff"}}>Date of Issue</th>
              }
              {pass.status==="Approved" &&
              <th style={{color:"#ffffff"}}>Date of Issue</th>
              }
              {pass.status==="Approved" && pass.payment!=="Done" &&
              <th style={{color:"#ffffff"}}>Pay</th>
              }
              {pass.status==="Approved" && pass.payment==="Done" &&
              <th style={{color:"#ffffff"}}>Print</th>
              }
          </tr>
          :
          <tr className="bg-dark">
            <th style={{color:"#ffffff"}}>Name</th>
            <th style={{color:"#ffffff"}}>Age</th>
            <th style={{color:"#ffffff"}}>Gender</th>
            <th style={{color:"#ffffff"}}>Source</th>
            <th style={{color:"#ffffff"}}>Destination</th>
            <th style={{color:"#ffffff"}}>Class</th>
            <th style={{color:"#ffffff"}}>Duration</th>
            <th style={{color:"#ffffff"}}>Total Cost</th>
            <th style={{color:"#ffffff"}}>Date of Issue</th>
            <th style={{color:"#ffffff"}}>Date of Expiry</th>
            <th style={{color:"#ffffff"}}>Print</th>
        </tr>
        }
        </thead>

      <tbody>
      {pass.isStudent ?
        <tr className="table-info">
          <td rowspan={pass.collegeID}>
            <b>{pass.collegeID}</b>
          </td>
          <td rowspan={pass.name}>
            <b>{pass.name}</b>
          </td>
          <td rowspan={pass.email}>
            <b>{pass.email}</b>
          </td>
          <td rowspan={pass.contactNo}>
            <b>{pass.contactNo}</b>
          </td>
          <td rowspan={pass.age}>
            <b>{pass.age}</b>
          </td>
          <td rowspan={pass.gender}>
            <b>{pass.gender}</b>
          </td>
          <td rowspan={pass.source}>
            <b>{pass.source}</b>
          </td>
          <td rowspan={pass.destination}>
            <b>{pass.destination}</b>
          </td>
          <td rowspan={pass.class}>
            <b>{pass.class}</b>
          </td>
          <td rowspan={pass.duration}>
            <b>{pass.duration}</b>
          </td>
          <td rowspan={pass.cost}>
            <b>{pass.cost}</b>
          </td>
          <td rowspan={pass.status}>
            <b>{pass.status}</b>
          </td>
          {pass.status==="Rejected" &&
          <td rowspan={pass.cost}>
            <button
              onClick={() => reApply(pass._id)}
              className="btn btn-sm btn-dark"
              >
                Re-Apply
            </button>
          </td>
          }
          {pass.status==="Approved" &&
          <td rowspan={pass.dateOfIssue}>
            <b>{pass.dateOfIssue}</b>
          </td>
          }
          {pass.status==="Approved" &&
          <td rowspan={pass.dateOfExpiry}>
            <b>{pass.dateOfExpiry}</b>
          </td>
          }
          {pass.status==="Approved" && pass.payment!=="Done" &&
          <td rowspan={pass.cost}>
            <button
              onClick={() => displayRazorpay(pass.cost, pass._id, pass.duration)}
              className="btn btn-sm btn-dark"
              >
                Pay
            </button>
          </td>
          }
          {pass.status==="Approved" && pass.payment==="Done" &&
          <td rowspan={pass.cost}>
            <button
              onClick={() => history.push("/myPass")}
              className="btn btn-sm btn-dark"
              >
                Print
            </button>
          </td>
          }
          </tr>
        :
        <tr className="table-info">
          <td rowspan={pass.name}>
            <b>{pass.name}</b>
          </td>
          <td rowspan={pass.age}>
            <b>{pass.age}</b>
          </td>
          <td rowspan={pass.gender}>
            <b>{pass.gender}</b>
          </td>
          <td rowspan={pass.source}>
            <b>{pass.source}</b>
          </td>
          <td rowspan={pass.destination}>
            <b>{pass.destination}</b>
          </td>
          <td rowspan={pass.class}>
            <b>{pass.class}</b>
          </td>
          <td rowspan={pass.duration}>
            <b>{pass.duration}</b>
          </td>
          <td rowspan={pass.cost}>
            <b>{pass.cost}</b>
          </td>
          <td rowspan={pass.dateOfIssue}>
            <b>{pass.dateOfIssue}</b>
          </td>
          <td rowspan={pass.dateOfExpiry}>
            <b>{pass.dateOfExpiry}</b>
          </td>
          <td rowspan={pass.cost}>
            <button
              onClick={() => history.push("/myPass")}
              className="btn btn-sm btn-dark"
              >
                Print
            </button>
          </td>
        </tr>
      }
      </tbody>
  </table>
  </div>
      :
      <div className="text-center" style={{paddingTop: "50px"}}>
        <h1 style={{paddingBottom: "20px"}}>No Pass Generated Yet!</h1>
        <button type="button" className="btn btn-dark btn-lg" onClick={() => history.push("/passGen")}>Generate Your Pass Now!</button>
      </div>
    }
    </div>
    );
}

export default PassDetails;
