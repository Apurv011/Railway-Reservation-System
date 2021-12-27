import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useLocation } from 'react-router-dom';
import CaptchaTextGenerator from 'captcha-text-generator';

function LogInForm(){

  const location = useLocation();
  let history = useHistory();

  const [user, setUser] = useState({
      email: "",
      password:""
  });

  useEffect(() => console.log(location.state) );

  const [captcha, setCaptcha] = useState("");
  const [captchaVal, setCaptchaVal] = useState("");

  function loginUser(event) {
    if(captcha===captchaVal){

        axios.post("http://localhost:5000/user/login", user).then(response => {
              localStorage.setItem('userData', JSON.stringify(response.data));
              if(location.state){
                history.push({
                      pathname: '/addPassengers',
                      state: { trainId: location.state.trainId, trainName: location.state.trainName, trainNumber: location.state.trainNumber,
                              from: location.state.from, to: location.state.to, cost:location.state.cost, atSrc: location.state.atSrc, atDest: location.state.atDest,
                              dateOfJourney: location.state.dateOfJourney, seatId: location.state.seatId, availableSeats: location.state.availableSeats, cancelledSeats: location.state.cancelledSeats }
                  });
              }
              else{
                history.push({
                      pathname: '/searchTrain',
                      state: { guest: false}
                  });
              }
        });

        setUser({
          email: "",
          password:""
        });
      }

//  }
    else{
      alert("Invalid Captcha!");
      window.location.reload();
    }

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

  function handleCaptchaChange(event){
      setCaptcha(event.target.value);
  }

  function result(text){
    setCaptchaVal(text);
  }

  return (
    <div className="container">
      <h1 className="text-dark" style={{fontSize:"75px", textAlign:"center", marginTop: "3rem"}}>Log In</h1>
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
                                        <div className="mb-3">
                                          <CaptchaTextGenerator
                                            height="30px"
                                            textColor="#2d3436"
                                            paddingTop="22px"
                                            background="#ffffff"
                                            result={result}
                                          />
                                        </div>
                                        <div className="mb-3">
                                          <input onChange={handleCaptchaChange} className="form-control form-control-user" type="text" id="examplePasswordInput" placeholder="Enter Captcha" name="captcha" value={captcha}/>
                                        </div>
                                          <button onClick={loginUser} className="btn btn-primary d-block btn-user w-100" type="submit">Login</button>
                                        <hr/>
                                    </form>
                                    <div className="text-center">
                                      <Link to="/signup">
                                        <p className="small" style={{color:"#000000"}}>Don't have an Account? Create Now!</p>
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
