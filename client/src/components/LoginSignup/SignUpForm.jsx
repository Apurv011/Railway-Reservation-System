import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

function SignUpForm(props){

  let history = useHistory();

  const [user, setUser] = useState({
      name: "",
      email: "",
      password:"",
      gender: "",
      contactNo: ""
  });

  const [uGender, setuGender] = useState("");

  function registerUser(event) {
    event.preventDefault();
      axios.post("http://localhost:5000/user/signup", user).then(response => {
        history.push('/login');
      });
      setUser({
        name: "",
        email: "",
        password:"",
        gender: "",
        contactNo: ""
      });
  }

  function setGender(event) {
    const value = event.target.value;
    setuGender(value);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((preValues) => {
      return {
        ...preValues,
        [name]: value,
        gender: uGender
      };
    });
  }

  return (
    <div className="container">
      <h1 className="text-dark" style={{fontSize:"75px", textAlign:"center", marginTop: "3rem"}}>Sign Up</h1>
        <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-flex">
                        <div className="flex-grow-1 bg-register-image" style={{backgroundImage: "url(https://images.moneycontrol.com/static-mcnews/2018/09/561559-railway-012917-770x433.jpg?impolicy=website&width=770&height=431)"}}></div>
                    </div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                                <h4 className="text-dark mb-4">Create an Account!</h4>
                            </div>
                            <form className="user">
                                <div className="row mb-3">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                      <input onChange={handleChange} className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="Name" name="name" value={user.name}/>
                                    </div>
                                    <div className="col-sm-6">
                                      <input onChange={handleChange} className="form-control form-control-user" type="tel" id="exampleFirstName" placeholder="Contact Number" name="contactNo" value={user.contactNo} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                  <input onChange={handleChange} className="form-control form-control-user" type="email" id="exampleFirstName" placeholder="Email" name="email" value={user.email} />
                                </div>
                                <div className="mb-3">
                                  <select onChange={setGender} value={uGender} className="form-control">
                                    <option value="default">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                  </select>
                                </div>
                                <div className="mb-3">
                                  <input onChange={handleChange} className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password" value={user.password}/>
                                </div>
                                  <button onClick={registerUser} className="btn btn-primary d-block btn-user w-100" type="submit">Register Account</button>
                                <hr/>
                            </form>
                            <div className="text-center">
                              <Link to="/login">
                                <p className="small" style={{color:"#000000"}}>Already have an account? Login!</p>
                              </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SignUpForm;
