import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';


function SearchTrain(props){

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  let history = useHistory();

  const [allStations, setAllStations] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateOfJourney, setDateOfJourney] = useState("");

  useEffect(() => {
      const loggedInUser = localStorage.getItem("userData");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };

        axios.get("http://localhost:5000/stations/", config).then(res => {
          setAllStations(res.data.stations);
          }).catch((error) => {
          history.push("/login");
        });
      }
      else{
        history.push("/login");
      }
  }, [history]);

  function updateFrom(event) {
    const value = event.target.value;
    if(value==="select"){
        setFrom("");
    }
    else{
      setFrom(value);
    }
  }

  function updateTo(event) {
    const value = event.target.value;
    if (value==="select"){
      setTo("");
    }
    else{
      setTo(value);
    }
  }

  function setDate(event) {
    const value = event.target.value;
    if (value==="select"){
      setDateOfJourney("");
    }
    else{
      const temp = value.split("-")
      const d = temp[2] + "-" + temp[1] + "-" + temp[0];
      setDateOfJourney(d);
    }
  }


  function search(){
    history.push({
          pathname: '/resultTrains',
          state: { from: from, to: to, dateOfJourney: dateOfJourney}
      });
  }

  return (
    <div>
    <Header />
    <div className="container" style={{marginTop: "80px"}}>
      <div className="d-flex justify-content-center">
          <div className="card bg-light mb-3">
            <div className="card-header">
              <h3 className="d-flex justify-content-center">
                Your Journey is Here
              </h3>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <form>
                  <div className="form-row">
                    <div className="col">
                      <div className="d-flex justify-content-between">
                        <div className="col">
                          <label htmlFor="inputState">From</label>
                          <select onChange={updateFrom} value={from} className="form-control">
                          <option value="select">Select</option>
                          {allStations.map((station, index) => {
                              return (
                                <option value={station.stationName}>{station.stationName}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col">
                        <label htmlFor="inputState">To</label>
                        <select onChange={updateTo} value={to} className="form-control">
                        <option value="select">Select</option>
                        {allStations.filter(st => st.stationName !== from).map((station, index) => {
                            return (
                              <option value={station.stationName}>{station.stationName}</option>
                            );
                          })}
                        </select>
                        </div>
                      </div>
                      <br />
                      <div>
                      <div style={{padding: "20px"}}>
                      <label style={{marginRight:"20px"}}>Select Date of Journey: </label>
                        <input min={today} type="date" value={dateOfJourney} onChange={setDate} name="jDate" />
                        </div>
                        <button type="submit" onClick={search} value="createTicket" className="btn btn-outline-dark btn-lg btn-block" >
                          Search Train
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </h5>
            </div>
            {from!=="" && to!=="" && dateOfJourney !=="" &&
            <div>
              <hr/>
              <div className="container">
                <h3>Source Station: {from}</h3>
                <h3>Destination Station: {to}</h3>
                <h3>Journey Date: {dateOfJourney}</h3>
              </div>
            </div>
          }
          </div>
        </div>
        </div>
        </div>
  );
}

export default SearchTrain;
