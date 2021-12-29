import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import {useLocation } from 'react-router-dom';

const UserPass = React.forwardRef((props, ref) =>{

  const location = useLocation();
  let history = useHistory();

  const [pass, setPass] = useState({});
  const [isPass, setIsPass] = useState(false);
  const [isPassVer, setIsPassVer] = useState(false);

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
            if(res.data[0].payment!=="Done"){
              history.push("/userHome");
            }
            setIsPass(true);
            if(res.data[0].status==="Verified by college"){
              setIsPassVer(true);
            }
            setPass(res.data[0]);
          }
          else{
              history.push("/userHome");
          }
          }).catch((error) => {
          history.push("/");
        });
      }
      else{
        history.push("/");
      }
  }, [history]);

  return (
    <div ref={ref}>
    <div className="d-flex justify-content-center" style={{marginTop: "80px"}}>
        <div className="card bg-light mb-3">
          <div className="card-header bg-dark">
            <h3 style={{color:"#ffffff"}} className="d-flex justify-content-center">Pass</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <form>
                <div className="form-row">
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="trainNumber">Name</label>
                    </h4>
                    <h3 className="text-center d-flex justify-content-center">
                      <b>{pass.name}</b>
                    </h3>
                  </div>

                  <hr />
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="trainName">Age</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{pass.age}</b>
                    </h3>
                  </div>
                </div>

                <hr />
                <div className="form-row">
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Gender</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{pass.gender}</b>
                    </h3>
                  </div>

                  <hr />
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Class</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{pass.class}</b>
                    </h3>
                  </div>
                </div>

                <hr />
                {
                  pass.dateOfIssue!=="NoDate" && pass.dateOfExpiry!=="NoDate" &&
                  <div className="form-row">
                    <div className="col" style={{padding: "30px"}}>
                      <h4 className="d-flex justify-content-center">
                        <label htmlFor="inputState">Issue Date</label>
                      </h4>
                      <h3 className="d-flex justify-content-center">
                        <b>{pass.dateOfIssue}</b>
                      </h3>
                    </div>

                    <hr />

                    <div className="col" style={{padding: "30px"}}>
                      <h4 className="d-flex justify-content-center">
                        <label htmlFor="inputState">Expiry Date</label>
                      </h4>
                      <h3 className="d-flex justify-content-center">
                        <b>{pass.dateOfExpiry}</b>
                      </h3>
                    </div>
                  </div>
              }
                <div className="form-row">
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Source</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{pass.source}</b>
                    </h3>
                  </div>

                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Destination</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{pass.destination}</b>
                    </h3>
                  </div>
                </div>

                <hr />

                <div className="form-row">
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Duration</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{pass.duration}</b>
                    </h3>
                  </div>

                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Cost</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{pass.cost}</b>
                    </h3>
                  </div>
                </div>

                <hr />

                {
                  pass.isStudent && pass.status!=="" &&

                  <div style={{margin:"auto"}} className="text-center">
                    {
                      pass.status!=="Verified by college" ?
                      <h2 className="text-danger">
                        <label>Status: {pass.status}</label>
                      </h2>
                      :
                      <h2 className="text-success">
                        <label>Status: {pass.status}</label>
                      </h2>
                    }
                  </div>

                }

                <hr />

                <div style={{margin:"auto"}} className="text-center">
                  <h2 className="text-success">
                    <label>Paid</label>
                  </h2>
                </div>

              </form>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
  });

export default UserPass;
