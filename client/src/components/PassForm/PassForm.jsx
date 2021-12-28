import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

function PassForm(props) {

  let history = useHistory();
  const location = useLocation();

  const [allStations, setAllStations] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [source, setSource] = useState("");
  const [showCost, setShowCost] = useState(false);
  const [isPass, setIsPass] = useState(false);

  const [pass, setPass] = useState({
    userId: "",
    name: "",
    age: "",
    gender: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    class: "",
    source: "",
    destination: "",
    duration: "",
    isStudent: false,
    collegeName: "",
    email: "",
    collegeID: "",
    contactNo: "",
    status: "",
    collegeIDImage: "",
    cost: ""
  });

  useEffect(() => {
       const loggedInUser = localStorage.getItem("userData");
       if (loggedInUser) {
         const foundUser = JSON.parse(loggedInUser);

         const config = {
           headers: { "Authorization": "Bearer " + foundUser.token }
         };

         axios.get(`http://localhost:5000/pass/user/${foundUser.user._id}`, config).then(res => {
           console.log(res.data[0]);
           if(res.data.length>0){
             if(res.data[0].status!=="Deleted"){
               setIsPass(true);
             }
           }
           }).catch((error) => {
           history.push("/");
         });

         if(location.state.type==="Student"){
           setPass((preValues) => {
             return {
               ...preValues,
               isStudent: true,
               status: "To be verified by college",
               userId: foundUser.user._id
             };
           });
        }
        else{
          setPass((preValues) => {
            return {
              ...preValues,
              isStudent: false,
              userId: foundUser.user._id
            };
          });
        }

         axios.get("http://localhost:5000/localStations/").then(res => {
           setAllStations(res.data.stations);
           }).catch((error) => {
           history.push("/");
         });

         axios.get("http://localhost:5000/college/").then(res => {
           setAllColleges(res.data.colleges);
           }).catch((error) => {
           history.push("/");
         });

       }
       else{
         history.push("/");
       }
   }, [history]);

   async function displayRazorpay(amt) {
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
           alert("Payment Successful!");
           history.push('/userHome');
         },
       };
       const paymentObject = new window.Razorpay(options);
       paymentObject.open();
     });
   }

   function getIssueDate(){
     let date_ob = new Date();
     if(location.state.type==="Student") {
       return "NoDate";
     }
     let date = ("0" + date_ob.getDate()).slice(-2);
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
     let year = date_ob.getFullYear();
     date = date + "-" + month + "-" + year;
     return date;
   }

  function getExpiryDate(num){
      let date_ob = new Date();
      if(location.state.type==="Student") {
        return "NoDate";
      }
      else{
        date_ob.setDate(date_ob.getDate() + num);
      }
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      date = date + "-" + month + "-" + year;
      return date;
    }

  function updateSource(event) {
    const value = event.target.value;
    if(value==="select"){
        return;
    }
    else{
      setSource(value);
      setPass((preValues) => {
        return {
          ...preValues,
          source: value
        };
      });
    }
  }

  function updateDestination(event) {
    const value = event.target.value;
    if(value==="select"){
        return;
    }
    else{
      setPass((preValues) => {
        return {
          ...preValues,
          destination: value
        };
      });
    }
  }

  function generatePass(event){
    if(pass.duration==="1 Month"){
      if(pass.class==="First Class"){
        setPass((preValues) => {
          return {
            ...preValues,
            cost: "300"
          };
        });
      }
      else{
        setPass((preValues) => {
          return {
            ...preValues,
            cost: "100"
          };
        });
      }
    }
    else{
      if(pass.class==="First Class"){
        setPass((preValues) => {
          return {
            ...preValues,
            cost: "800"
          };
        });
      }
      else{
        setPass((preValues) => {
          return {
            ...preValues,
            cost: "250"
          };
        });
      }
    }
    setShowCost(true);
    event.preventDefault();
  }

  function upload(event){
      const { name, value } = event.target;
      setPass((preValues) => {
        return {
          ...preValues,
          [name]: value,
          collegeIDImage: event.target.files[0]
        };
      });
    }

    function requestPass(event){
      console.log(pass);

      const loggedInUser = localStorage.getItem("userData");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };

        const formData = new FormData();

        formData.append("userId", pass.userId);
        formData.append("name", pass.name);
        formData.append("cost", pass.cost);
        formData.append("age", pass.age);
        formData.append("gender", pass.gender);
        formData.append("dateOfIssue", pass.dateOfIssue);
        formData.append("dateOfExpiry", pass.dateOfExpiry);
        formData.append("source", pass.source);
        formData.append("destination", pass.destination);
        formData.append("class", pass.class);
        formData.append("isStudent", pass.isStudent);
        formData.append("collegeName", pass.collegeName);
        formData.append("email", pass.email);
        formData.append("collegeID", pass.collegeID);
        formData.append("contactNo", pass.contactNo);
        formData.append("duration", pass.duration);
        formData.append("status", pass.status);
        formData.append("collegeIDImage", pass.collegeIDImage);

        axios.post("http://localhost:5000/pass", formData, config).then(response => {
            console.log(response.data);
            alert("Pass Requested");
            history.push("/userHome");
        });

        setPass({
          userId: "",
          name: "",
          age: "",
          gender: "",
          dateOfIssue: "",
          dateOfExpiry: "",
          class: "",
          source: "",
          destination: "",
          duration: "",
          isStudent: false,
          collegeName: "",
          email: "",
          collegeID: "",
          contactNo: "",
          status: "",
          collegeIDImage: "",
          cost: ""
        });
      }
      event.preventDefault();
    }


  function createPass(event){
    console.log(pass);

    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      const formData = new FormData();

      formData.append("userId", pass.userId);
      formData.append("name", pass.name);
      formData.append("cost", pass.cost);
      formData.append("age", pass.age);
      formData.append("gender", pass.gender);
      formData.append("dateOfIssue", pass.dateOfIssue);
      formData.append("dateOfExpiry", pass.dateOfExpiry);
      formData.append("source", pass.source);
      formData.append("destination", pass.destination);
      formData.append("class", pass.class);
      formData.append("isStudent", pass.isStudent);
      formData.append("collegeName", pass.collegeName);
      formData.append("email", pass.email);
      formData.append("collegeID", pass.collegeID);
      formData.append("contactNo", pass.contactNo);
      formData.append("duration", pass.duration);
      formData.append("status", pass.status);
      formData.append("collegeIDImage", pass.collegeIDImage);
      formData.append("payment", "Done");

      axios.post("http://localhost:5000/pass", formData, config).then(response => {
          console.log(response.data);
          displayRazorpay(pass.cost, config);
      });

      setPass({
        userId: "",
        name: "",
        age: "",
        gender: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        class: "",
        source: "",
        destination: "",
        duration: "",
        isStudent: false,
        collegeName: "",
        email: "",
        collegeID: "",
        contactNo: "",
        status: "",
        collegeIDImage: "",
        cost: ""
      });
    }
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if(name==="duration"){
      var expiryDate;
      if(value=="1 Month"){
        expiryDate = getExpiryDate(30);
      }
      else{
        expiryDate = getExpiryDate(90);
      }
      console.log(expiryDate);
      setPass((preValues) => {
        return {
          ...preValues,
          [name]: value,
          dateOfIssue: getIssueDate(),
          dateOfExpiry: expiryDate
        };
      });
    }
    else{
      setPass((preValues) => {
        return {
          ...preValues,
          [name]: value
        };
      });
    }
  }

  return (
    <div>
    {!isPass ?
      <div className="container">
        <h1
          className="text-dark"
          style={{ fontSize: "65px", textAlign: "center", marginTop: "5rem" }}
        >
          Pass Generation System
        </h1>
        <div className="card shadow-lg o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-flex">
                <div
                  className="flex-grow-1 bg-register-image"
                  style={{
                    backgroundImage:
                      "url(https://st3.depositphotos.com/9881890/15397/i/600/depositphotos_153977506-stock-photo-vintage-light-bulb.jpg)"
                  }}
                ></div>
              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Create a Pass</h4>
                  </div>
                  <form className="user">
                    <div className="mb-3">
                      <label htmlFor="inputState">Name</label>
                      <input
                        onChange={handleChange}
                        className="form-control form-control-user"
                        type="text"
                        id="exampleFirstName"
                        placeholder="Name"
                        name="name"
                        value={pass.name}
                      />
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <label htmlFor="inputState">Source</label>
                        <select name="source" onChange={updateSource} value={pass.source} className="form-control">
                          <option value="select">Select</option>
                          {allStations.map((station, index) => {
                            return (
                              <option value={station.stationName}>{station.stationName}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="inputState">Destination</label>
                        <select name="destination" onChange={updateDestination} value={pass.destination} className="form-control">
                          <option value="select">Select</option>
                          { allStations.filter(st => st.stationName !== source).map((station, index) => {
                            return (
                              <option value={station.stationName}>{station.stationName}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="inputState">Age</label>
                      <input
                        onChange={handleChange}
                        className="form-control form-control-user"
                        type="number"
                        id="exampleFirstName"
                        placeholder="Age"
                        name="age"
                        value={pass.age}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="inputState">Gender</label>
                      <select name="gender" onChange={handleChange} value={pass.gender} className="form-control">
                        <option value="select">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label>Duration</label>
                      <select name="duration" onChange={handleChange} value={pass.duration} className="form-control">
                        <option value="select">Select</option>
                        <option value="1 Month">1 Month</option>
                        <option value="3 Months">3 Months</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label>Class</label>
                      <select name="class" onChange={handleChange} value={pass.class} className="form-control">
                        <option value="select">Select</option>
                        <option value="First Class">First Class</option>
                        <option value="Second Class">Second Class</option>
                      </select>
                    </div>

                    {
                      location.state.type==="Student" &&

                      <div className="mb-3">
                        <label>Select College</label>
                        <select name="collegeName" onChange={handleChange} value={pass.collegeName} className="form-control">
                        <option value="select">Select</option>
                        {allColleges.map((college, index) => {
                          return (
                            <option value={college.collegeName}>{college.collegeName}</option>
                          );
                        })}
                        </select>
                      </div>

                    }

                    {
                      location.state.type==="Student" &&

                      <div className="mb-3">
                      <label>College ID (Roll Number)</label>
                      <input
                        onChange={handleChange}
                        className="form-control form-control-user"
                        type="text"
                        id="exampleFirstName"
                        placeholder="ID"
                        name="collegeID"
                        value={pass.collegeID}
                      />
                      </div>

                    }

                    {
                      location.state.type==="Student" &&

                      <div className="mb-3">
                      <label>College Email</label>
                      <input
                        onChange={handleChange}
                        className="form-control form-control-user"
                        type="email"
                        id="exampleFirstName"
                        placeholder="College Email"
                        name="email"
                        value={pass.email}
                      />
                      </div>

                    }

                    {
                      location.state.type==="Student" &&

                      <div className="mb-3">
                      <label>Contact Number</label>
                      <input
                        onChange={handleChange}
                        className="form-control form-control-user"
                        type="tel"
                        id="exampleFirstName"
                        placeholder="Conteact Number"
                        name="contactNo"
                        value={pass.contactNo}
                      />
                      </div>

                    }

                    {
                      location.state.type==="Student" &&

                      <div className="mb-3">
                      <label>Upload Your College ID</label>
                        <input type="file" multiple name="collegeIDImage" onChange={upload} />
                      </div>
                    }

                    <button
                      onClick={generatePass}
                      className="btn btn-primary d-block btn-user w-100"
                      type="submit"
                    >
                      Generate Pass
                    </button>

                    {showCost && <p style={{paddingTop: "15px"}}><strong>Cost: {pass.cost}</strong></p>}

                  {showCost &&
                    <button
                      onClick={location.state.type!=="Student" ? createPass : requestPass}
                      className="btn btn-primary d-block btn-user w-100"
                      type="submit"
                    >
                      Get Your Pass
                    </button>
                  }
                    <hr />

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <div className="text-center" style={{paddingTop: "50px"}}>
        <h1 style={{paddingBottom: "20px"}}>Pass Already Requested!</h1>
        <button type="button" className="btn btn-dark btn-lg" onClick={() => history.push("/passDetails")}>Check Your Pass Status</button>
      </div>
    }
    </div>
  );
}

export default PassForm;
