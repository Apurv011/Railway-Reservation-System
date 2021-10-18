import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

function LogInForm(){

  let history = useHistory();

  const [user, setUser] = useState({
      email: "",
      password:""
  });

  function loginUser(event) {
    axios.post("http://localhost:5000/user/login", user).then(response => {
          console.log(response.data);
          localStorage.clear();
          localStorage.setItem('userData', JSON.stringify(response.data));
          history.push('/searchTrain');
    });

    setUser({
      email: "",
      password:""
    });

    event.preventDefault();

  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  return (
    <div className="container">
      <h1 className="text-dark" style={{fontSize:"75px", textAlign:"center", marginTop: "5rem"}}>Log In</h1>
        <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                    <div className="card-body p-0">
                        <div className="row">
                          <div className="col-lg-6 d-none d-lg-flex">
                              <div className="flex-grow-1 bg-login-image" style={{backgroundImage: "url(https://images.moneycontrol.com/static-mcnews/2018/09/561559-railway-012917-770x433.jpg?impolicy=website&width=770&height=431)"}}>
                              </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h4 className="">Welcome Back!</h4>
                                    </div>
                                    <form className="user">
                                        <div className="mb-3">
                                          <input onChange={handleChange} className="form-control form-control-user" type="email" id="exampleFirstName" placeholder="Email" name="email" value={user.email} />
                                        </div>
                                        <div className="mb-3">
                                          <input onChange={handleChange} className="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password" value={user.password}/>
                                        </div>
                                          <button onClick={loginUser} className="btn btn-primary d-block btn-user w-100" type="submit">Login</button>
                                        <hr/>
                                    </form>
                                    <div className="text-center">
                                      <Link to="/signup">
                                        <a className="small" href="register.html">Create an Account!</a>
                                      </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}

export default LogInForm;
