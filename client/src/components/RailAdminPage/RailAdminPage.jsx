import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import { saveAs } from "file-saver";

function RailAdminPage(props){

  const location = useLocation();
  let history = useHistory();

  const [verifiedPasses, setVerifiedPasses] = useState([]);
  const [approvedPasses, setApprovedPasses] = useState([]);
  const [rejectedPasses, setRejectedPasses] = useState([]);

  useEffect(() => {

        axios.get(`http://localhost:5000/pass/verified/`).then(res => {
          setVerifiedPasses(res.data.passes);
        }).catch((error) => {
          history.push("/");
        });

        axios.get(`http://localhost:5000/pass/rejected/`).then(res => {
          setRejectedPasses(res.data.passes);
        }).catch((error) => {
          history.push("/");
        });

        axios.get(`http://localhost:5000/pass/approved/`).then(res => {
          setApprovedPasses(res.data.passes);
        }).catch((error) => {
          history.push("/");
        });

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

  function approve(id, duration){

      var expiryDate = duration==="1 Month" ? getExpiryDate(30) : getExpiryDate(90);

      var change = {
                    "status": "Approved",
                    "dateOfIssue": getIssueDate(),
                    "dateOfExpiry": expiryDate
                    }

      axios.patch(`http://localhost:5000/pass/${id}`, change).then(response => {
          console.log(response.data);
          axios.get(`http://localhost:5000/pass/approved/`).then(res => {
            setApprovedPasses(res.data.passes);
          }).catch((error) => {
            history.push("/");
          });
      });

      setVerifiedPasses((preValues) => {
        return verifiedPasses.filter((pass, index) => {
          return pass._id !== id;
        });
      });
  }

  function reject(id){

      var change = {"status": "Rejected"}

      axios.patch(`http://localhost:5000/pass/${id}`, change).then(response => {
          console.log(response.data);
          axios.get(`http://localhost:5000/pass/rejected/`).then(res => {
            setRejectedPasses(res.data.passes);
          }).catch((error) => {
            history.push("/");
          });
      });
      setVerifiedPasses((preValues) => {
        return verifiedPasses.filter((pass, index) => {
          return pass._id !== id;
        });
      });
  }

  function saveFile(url, file_name){
    saveAs(
      url,
      file_name
    );
  };

  function logout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="btn btn-link navbar-brand">Pass Generation System</button>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button onClick={logout} className="nav-link btn btn-link">Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      <h1 style={{ paddingLeft:"25px", paddingTop:"25px", color: props.color }}>Requested Passes</h1>
      {verifiedPasses.length<1 && <h5 style={{paddingLeft: "25px"}}>No Passes</h5>}
        {verifiedPasses.length>=1 &&
        <div className="table-responsive" style={{padding:"25px"}}>
        <table className="table table-hover table-light">
          <thead>
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
              <th style={{color:"#ffffff"}}>College ID</th>
              <th style={{color:"#ffffff"}}>Approve</th>
              <th style={{color:"#ffffff"}}>Reject</th>
            </tr>
          </thead>
        {verifiedPasses.map((pass, index) => {
            return (
        <tbody>
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
            <td rowspan={pass.cost}>
              <button
                onClick={()=>{saveFile(`http://localhost:5000/${pass.collegeIDImage}`, `${Date.now()}.${pass.collegeIDImage.split('.').at(-1)}`)}}
                className="btn btn-sm btn-dark"
                >
                  Download
              </button>
            </td>
            <td>
              <button
                data-toggle="modal" data-target="#exampleModalCenter"
                onClick={() => approve(pass._id, pass.duration)}
                className="btn btn-sm btn-success"
              >
                Approve
              </button>
            </td>
            <td>
              <button
                data-toggle="modal" data-target="#exampleModalCenter"
                onClick={() => reject(pass._id)}
                className="btn btn-sm btn-danger"
              >
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      );
    })}
    </table>
    </div>
  }

  <h1 style={{ paddingLeft:"25px", paddingTop:"25px", color: props.color }}>Approved Passes</h1>
  {approvedPasses.length<1 && <h5 style={{paddingLeft: "25px"}}>No Passes</h5>}
    {approvedPasses.length>=1 &&
    <div className="table-responsive" style={{padding:"25px"}}>
    <table className="table table-hover table-light">
      <thead>
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
          <th style={{color:"#ffffff"}}>College ID</th>
        </tr>
      </thead>
    {approvedPasses.map((pass, index) => {
        return (
    <tbody>
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
          <b>{pass.class}</b>
        </td>
        <td rowspan={pass.destination}>
          <b>{pass.name}</b>
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
        <td rowspan={pass.cost}>
        <button
          onClick={()=>{saveFile(`http://localhost:5000/${pass.collegeIDImage}`, `${Date.now()}.${pass.collegeIDImage.split('.').at(-1)}`)}}
          className="btn btn-sm btn-dark"
          >
            Download
        </button>
        </td>
      </tr>
    </tbody>
  );
  })}
  </table>
  </div>
  }

  <h1 style={{ paddingLeft:"25px", paddingTop:"25px", color: props.color }}>Rejected Passes</h1>
  {rejectedPasses.length<1 && <h5 style={{paddingLeft: "25px"}}>No Passes</h5>}
    {rejectedPasses.length>=1 &&
    <div className="table-responsive" style={{padding:"25px"}}>
    <table className="table table-hover table-light">
      <thead>
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
          <th style={{color:"#ffffff"}}>College ID</th>
        </tr>
      </thead>
    {rejectedPasses.map((pass, index) => {
        return (
    <tbody>
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
          <b>{pass.class}</b>
        </td>
        <td rowspan={pass.destination}>
          <b>{pass.name}</b>
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
        <td rowspan={pass.cost}>
        <button
          onClick={()=>{saveFile(`http://localhost:5000/${pass.collegeIDImage}`, `${Date.now()}.${pass.collegeIDImage.split('.').at(-1)}`)}}
          className="btn btn-sm btn-dark"
          >
            Download
        </button>
        </td>
      </tr>
    </tbody>
  );
  })}
  </table>
  </div>
  }

  </div>
  );
}

export default RailAdminPage;
