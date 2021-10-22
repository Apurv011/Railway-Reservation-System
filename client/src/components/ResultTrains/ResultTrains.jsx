import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';

function ResultTrains(props){

  const location = useLocation();
  let history = useHistory();

  const [allTrains, setAllTrains] = useState([]);
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

      setFrom(location.state.from);
      setTo(location.state.to);

      setDateOfJourney(location.state.dateOfJourney);

      axios.get(`http://localhost:5000/trains/stations/${location.state.from}/${location.state.to}`, config).then(res => {
        setAllTrains(res.data);
        }).catch((error) => {
        history.push("/login");
      });
    }
    else{
      history.push("/login");
    }
  }, [location.state.from, location.state.to, location.state.dateOfJourney, history]);

  function proceed(trainId, trainNumber){
    history.push({
          pathname: '/trainInfo',
          state: { trainId: trainId, from: from, to: to, dateOfJourney: dateOfJourney,  trainNumber: trainNumber}
      });
  }

  function schedule(trainId, trainNumber){
    history.push({
          pathname: '/trainSchedule',
          state: { trainId: trainId, from: from, to: to, dateOfJourney: dateOfJourney,  trainNumber: trainNumber}
      });
  }

  return (
    <div>
    <Header />
    <div className="container">
    <div className="container" style={{padding:"30px"}}>
      <h3 className="d-flex justify-content-center">Source Station: {from}</h3>
      <h3 className="d-flex justify-content-center">Destination Station: {to}</h3>
    </div>
    <div className="table-responsive">
    <table className="table table-hover table-warning">
      <thead>
        <tr>
          <th scope="col">Train Number</th>
          <th scope="col">Train Name</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Journey Date</th>
          <th scope="col">Action</th>
          <th scope="col">Schedule</th>
        </tr>
      </thead>
    {allTrains.map((train, index) => {
        return (
          <tbody>
            <tr className="table-info">
              <td>
                <b>{train.trainNumber}</b>
              </td>
              <td>
                <b>{train.trainName}</b>
              </td>
              <td>
                <b>{train.sourceStationName}</b>
              </td>
              <td>
                <b>{train.destinationStationName}</b>
              </td>
              <td>
                <b>{dateOfJourney}</b>
              </td>
              <td>
                <button onClick={() => proceed(train._id, train.trainNumber)} className="btn btn-sm btn-outline-dark">Proceed</button>
              </td>
              <td>
                <button onClick={() => schedule(train._id, train.trainNumber)} className="btn btn-sm btn-outline-dark">Schedule</button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
    </div>
      </div>
    </div>
  );
}

export default ResultTrains;
