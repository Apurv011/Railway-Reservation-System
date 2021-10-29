import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";

function UserHome() {
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [gender, setGender] = useState("");
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    contactNo: ""
  });
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
        const config = {
          headers: { Authorization: "Bearer " + foundUser.token }
        };

        axios
          .get(`http://localhost:5000/user/${foundUser.user._id}`, config)
          .then((res) => {
            setName(res.data.user.name);
            setEmail(res.data.user.email);
            setContactNo(res.data.user.contactNo);
            setGender(res.data.user.gender);
            setUserId(res.data.user._id);
            setUserInfo({
              name: res.data.user.name,
              email: res.data.user.email,
              contactNo: res.data.user.contactNo
            });
          })
          .catch((error) => {
            history.push("/login");
          });
    } else {
      history.push("/login");
    }
  }, [history]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInfo((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  function update() {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { Authorization: "Bearer " + foundUser.token }
      };
        axios
          .patch(`http://localhost:5000/user/${foundUser.user._id}`, userInfo, config)
          .then((response) => {
            console.log(response.data);
            axios
              .get(`http://localhost:5000/user/${foundUser.user._id}`, config)
              .then((res) => {
                setName(res.data.user.name);
                setEmail(res.data.user.email);
                setContactNo(res.data.user.contactNo);
                setGender(res.data.user.gender);
                setUserId(res.data.user._id);
              })
              .catch((error) => {
                history.push("/login");
              });
          });
        setUserInfo({
          name: "",
          email: "",
          contactNo: ""
        });
    } else {
      history.push("/login");
    }
  }

  return (
    <div>
      <Header page="User Home" />
      <div style={{paddingTop:"50px", marginBottom: "50px"}} className="d-flex justify-content-center ">
        <div style={{ width: "450px"}} className="card bg-light ">
          <div className="card-header bg-dark">
            <h3 style={{color: "#ffffff"}} className="d-flex justify-content-center">Account Details</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <form>
                <div className="form-row ">
                  <div className="col" align="center">
                    <h4>
                      <label>Name</label>
                      <br />
                      <b>{name}</b>
                    </h4>
                  </div>

                  <div className="col" align="center">
                    <h4>
                      <label>Gender</label>
                      <br />
                      <b>{gender}</b>
                    </h4>
                  </div>
                </div>

                <hr />
                <div className="col">
                  <h4 className="d-flex justify-content-center">
                    <label htmlFor="trainName">Email</label>
                  </h4>
                  <h3 className="d-flex justify-content-center">
                    <b>{email}</b>
                  </h3>
                </div>

                <hr />
                <div className="col">
                  <h4 className="d-flex justify-content-center">
                    <label htmlFor="trainName">Contact Number</label>
                  </h4>
                  <h3 className="d-flex justify-content-center">
                    <b>{contactNo}</b>
                  </h3>
                </div>
              </form>
            </h5>
          </div>
          <button type="button"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  className="btn btn-dark btn-lg btn-block">
            Update
          </button>
        </div>
      </div>
      <div className="modal fade" id="exampleModalCenter">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Your Details</h5>
            </div>
            <div className="modal-body">
              <label>
                <b>Change Name</b>
              </label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                className="form-control"
              />
              <label style={{ marginTop: "20px" }}>
                <b>Change Email</b>
              </label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="form-control"
              />
              <label style={{ marginTop: "20px" }}>
                <b>Change Contact Number</b>
              </label>
              <input
                type="tel"
                name="contactNo"
                value={userInfo.contactNo}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={update}
                data-dismiss="modal"
              >
                Done
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
}

export default UserHome;
