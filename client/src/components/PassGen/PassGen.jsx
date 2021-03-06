import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "../WelcomePage/WelcomePage.module.css";

const PassGen = React.forwardRef((props, ref) => {

  let history = useHistory();

  const [college, setCollege] = useState({
      collegeId: "",
      password:""
  });

  const [railAdmin, setRailAdmin] = useState({
      id: "",
      adminPassword:""
  });

  function login(type) {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      history.push({
          pathname: '/passForm',
          state: { type: type }
        });
    }
    else{
      history.push({
            pathname: '/login',
            state: { passGen: true, type: type}
      });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCollege((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  function handleChangeForRail(event) {
    const { name, value } = event.target;
    setRailAdmin((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  function clgAdminLogin(event) {
    axios.post("http://localhost:5000/college/login", college).then(response => {
        localStorage.setItem('collegeData', JSON.stringify(response.data));
        console.log("A");
        history.push({
              pathname: '/collegeAdminPage',
              state: { collegeName: response.data.college.collegeName}
          });

      });

      setCollege({
        collegeId: "",
        password:""
      });
    event.preventDefault();
  }

  function railAdminLogin(event) {
    console.log(railAdmin);
    if(railAdmin.id==="admin@gmail.com" && railAdmin.adminPassword==="railAdmin@321"){
        console.log("A");
        history.push("/railAdminPage");
    }
    setRailAdmin({
      id: "",
      adminPassword:""
    });
    event.preventDefault();
  }

  return (
    <div ref={ref} className={`${styles.center}`}>
      <h1
        className="text-dark"
        style={{ textAlign: "center", fontSize: "75px" }}
      >
        ????Pass Generation System
      </h1>
      <p
        className="text-dark"
        style={{ fontSize: "30px", textAlign: "center", marginTop: "35px" , marginBottom:"40px"}}
      >
        Generate Your Pass Now!
      </p>
      <div style={{width:"100%"}}>
        <div style={{margin:"0 auto", display:"table", marginBottom:"40px"}}>
          <button type="button" onClick={() => login("Normal")} className="btn btn-lg btn-outline-dark mr-3">
            Normal Pass
          </button>
          <button type="button" onClick={() => login("Student")} className="btn btn-lg btn-outline-dark ml-3">
            Student Pass
          </button>
        </div>
      </div>
      <div style={{margin:"0 auto", display:"table", marginBottom:"40px"}}>
      <button data-toggle="modal"
              data-target="#exampleModalCenter"
              type="button" className="btn btn-lg"
              style={{marginBottom: "40px", color: "#000000"}}
              >
        <p className={`${styles.bottom}`}>College Admin Login</p>
      </button>
      <button data-toggle="modal"
              data-target="#exampleModalCenter2"
              type="button" className="btn btn-lg"
              style={{marginBottom: "40px", color: "#000000"}}
              >
        <p className={`${styles.bottom}`}>Railway Admin Login</p>
      </button>
      </div>
      <div className="modal fade" id="exampleModalCenter">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">????College Admin Login</h5>
            </div>
            <div className="modal-body">
              <label>
                <b>???Enter College ID</b>
              </label>
              <div className="form-inline">
                <input
                  type="text"
                  name="collegeId"
                  value={college.collegeId}
                  onChange={handleChange}
                  className="form-control mr-sm-2 mb-3"
                />
              </div>
              <label className="mt-3">
                <b>????Enter Password</b>
              </label>
              <div className="form-inline">
                <input
                  type="password"
                  name="password"
                  value={college.password}
                  onChange={handleChange}
                  className="form-control mr-sm-2"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={clgAdminLogin}
                data-dismiss="modal"
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModalCenter2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">????Admin Login</h5>
            </div>
            <div className="modal-body">
              <label>
                <b>???Enter Admin ID</b>
              </label>
              <div className="form-inline">
                <input
                  type="text"
                  name="id"
                  value={railAdmin.id}
                  onChange={handleChangeForRail}
                  className="form-control mr-sm-2 mb-3"
                />
              </div>
              <label className="mt-3">
                <b>????Enter Password</b>
              </label>
              <div className="form-inline">
                <input
                  type="password"
                  name="adminPassword"
                  value={railAdmin.adminPassword}
                  onChange={handleChangeForRail}
                  className="form-control mr-sm-2"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={railAdminLogin}
                data-dismiss="modal"
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PassGen;
