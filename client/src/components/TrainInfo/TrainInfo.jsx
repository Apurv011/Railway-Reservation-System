import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import {useLocation } from 'react-router-dom';

function TrainInfo(props){

  const location = useLocation();
  let history = useHistory();

  const [trainId, setTrainId] = useState("");
  const [trainData, setTrainData] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sourceAT, setSourceAT] = useState("");
  const [sourceDT, setSourceDT] = useState("");
  const [destAT, setDestAT] = useState("");
  const [destDT, setDestDT] = useState("");
  const [srcDist, setSrcDist] = useState("");
  const [destDist, setDestDist] = useState("");
  const [dateOfJourney, setDateOfJourney] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const [cancelledSeats, setCancelledSeats] = useState([]);
  const [seatId, setSeatId] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
      };
      getData();
    }
    else{
      getData();
    }
  }, [location.state.trainId, location.state.from, location.state.to, location.state.dateOfJourney, location.state.trainNumber, history]);

  function getData(){
    const temp = location.state.dateOfJourney.split("-")
    const d = temp[0] + "%2F" + temp[1] + "%2F" + temp[2];

    setTrainId(location.state.trainId);
    setFrom(location.state.from);
    setTo(location.state.to);
    setDateOfJourney(location.state.dateOfJourney);

    axios.get(`http://localhost:5000/seats/${location.state.trainNumber}/${d}`).then(res => {
        setAvailableSeats(parseInt(res.data.seats[0].availableSeats));
        setCancelledSeats(res.data.seats[0].cancelledSeats);
        setSeatId(res.data.seats[0]._id);
      }).catch((error) => {
      history.push("/login");
    });

    axios.get(`http://localhost:5000/trains/${location.state.trainId}`).then(res => {
        console.log(res.data);
        for(let i=0; i<res.data.schedule.length; i++){
          if(res.data.schedule[i].Station === location.state.from) {
              setSourceAT(res.data.schedule[i].AT);
              setSourceDT(res.data.schedule[i].DT);
              setSrcDist(res.data.stations[i].Distance);
              break;
            }
        }
        for(let i=0; i<res.data.schedule.length; i++){
          if(res.data.schedule[i].Station === location.state.to) {
              setDestAT(res.data.schedule[i].AT);
              setDestDT(res.data.schedule[i].DT);
              setDestDist(res.data.stations[i].Distance);
              break;
            }
        }
        setTrainData(res.data);

      }).catch((error) => {
      history.push("/login");
    });
  }

  function goToAddPassenger(){
    if(location.state.guest===true){
      history.push({
        pathname: '/login',
        state: { trainId: trainId, trainName: trainData.trainName, trainNumber: trainData.trainNumber,
                from: from, to: to, cost:(destDist - srcDist)*3, atSrc: sourceAT, atDest: destAT,
                dateOfJourney: dateOfJourney, seatId: seatId, availableSeats: availableSeats, cancelledSeats: cancelledSeats }
        });
    }
    else{
      history.push({
            pathname: '/addPassengers',
            state: { trainId: trainId, trainName: trainData.trainName, trainNumber: trainData.trainNumber,
                    from: from, to: to, cost:(destDist - srcDist)*3, atSrc: sourceAT, atDest: destAT,
                    dateOfJourney: dateOfJourney, seatId: seatId, availableSeats: availableSeats, cancelledSeats: cancelledSeats }
        });
    }
  }

  return (
    <div>
    <Header guest={location.state.guest}/>
    <div className="d-flex justify-content-center" style={{marginTop: "80px"}}>
        <div className="card bg-light mb-3">
          <div className="card-header bg-dark">
            <h3 style={{color:"#ffffff"}} className="d-flex justify-content-center">Book Your Journey</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <form>
                <div className="form-row">
                  <div className="col ">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="trainNumber">Train Number</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{trainData.trainNumber}</b>
                    </h3>
                  </div>

                  <hr />
                  <div className="col">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="trainName">Train Name</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{trainData.trainName}</b>
                    </h3>
                  </div>
                </div>

                <hr />
                <div className="form-row">
                  <div className="col">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Your Boarding Station</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{from}</b>
                    </h3>
                  </div>

                  <hr />
                  <div className="col">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Your Destination Station</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{to}</b>
                    </h3>
                  </div>

                </div>

                <hr />
                <div className="form-row">
                  <div className="col">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Arrival Time at Source</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{sourceAT}</b>
                    </h3>
                  </div>

                  <hr />
                  <div className="col">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Departure Time at Source</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{sourceDT}</b>
                    </h3>
                  </div>
                </div>

                <hr />
                <div className="form-row">
                  <div className="col">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Arrival Time at Destination</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{destAT}</b>
                    </h3>
                  </div>

                  <hr />
                  <div className="col">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Departure Time at Destination</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{destDT}</b>
                    </h3>
                  </div>
                </div>


                <hr />
                <div className="form-row">
                  <div className="col">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Available Seats</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{parseInt(availableSeats) + parseInt(cancelledSeats.length)}</b>
                    </h3>
                  </div>

                  <hr />
                  <div className="col">
                    <h4 className="d-flex justify-content-center">
                      <label htmlFor="inputState">Cost</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{(destDist - srcDist)*3}</b>
                    </h3>
                  </div>
                </div>

                <hr />
                <div className="col">
                  <h4 className="d-flex justify-content-center">
                    <label htmlFor="inputState">Date of Journey</label>
                  </h4>
                  <h3 className="d-flex justify-content-center">
                    <b>{dateOfJourney}</b>
                  </h3>
                </div>

                <div style={{marginTop: "10px"}}>
                {
                  availableSeats===0 ?
                  <button onClick={() => history.push("/searchTrain")} className="btn btn-sm btn-outline-dark">
                    Seats Not Available
                  </button>
                  :
                  <button type="button" onClick={goToAddPassenger} className="btn btn-dark btn-lg btn-block">
                    Fill Passenger Information
                  </button>
                }
                </div>
              </form>
            </h5>
          </div>
        </div>
      </div>
      </div>
  );
}

export default TrainInfo;
