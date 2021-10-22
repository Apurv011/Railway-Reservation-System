import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';

function BookTicket(props){

  const location = useLocation();
  let history = useHistory();

  const [allPassengers, setAllPassengers] = useState([]);
  const [trainNumber, setTrainNumber] = useState("");
  const [trainName, setTrainName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [atSrc, setAtSrc] = useState("");
  const [atDest, setAtDest] = useState("");
  const [cost, setCost] = useState("");
  const [uId, setUId] = useState("");
  const [dateOfJourney, setDateOfJourney] = useState("");

  const [ticket, setTicket] = useState({
    userId: "",
    passengers: [],
    trainName: "",
    trainNumber: "",
    from: "",
    to: "",
    cost: ""
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUId(foundUser.user._id);

      setAllPassengers(location.state.passengers);
      setTrainNumber(location.state.trainNumber);
      setTrainName(location.state.trainName);
      setFrom(location.state.from);
      setTo(location.state.to);
      setAtSrc(location.state.atSrc);
      setAtDest(location.state.atDest);
      setCost(location.state.cost*location.state.passengers.length);
      setDateOfJourney(location.state.dateOfJourney);

      setTicket((preValues) => {
        return {
          ...preValues,
          userId: uId,
          passengers: allPassengers,
          trainName: trainName,
          trainNumber: trainNumber,
          from: from,
          to: to,
          cost: cost,
          dateOfJourney: dateOfJourney
        };
      });

    }
    else{
      history.push("/login");
    }
  }, [allPassengers, trainName, trainNumber, from, to, atSrc, atDest, cost, dateOfJourney, history]);

  function cancel(){
    setAllPassengers([]);
    setTrainNumber("");
    setTrainName("");
    setFrom("");
    setTo("");
    setAtSrc("");
    setAtDest("");
    setCost("");
    setDateOfJourney("");
    history.push("/searchTrain");
  }

function bookTicket(){

  const loggedInUser = localStorage.getItem("userData");
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);

    const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
    };

    let n = location.state.availableSeats - allPassengers.length;
    const update = { "availableSeats":  n};
    console.log(update);

    axios.patch(`http://localhost:5000/seats/${location.state.seatId}`, update, config).then(response => {
      console.log(response.data);
    });
    axios.post("http://localhost:5000/tickets/", ticket, config).then(response => {
      console.log(response.data);
      history.push('/login');
    });

    setTicket({
        userId: "",
        passengers: [],
        trainName: "",
        trainNumber: "",
        from: "",
        to: "",
        cost: "",
        dateOfJourney: ""
    });

  }

}

  return (
    <div>
      <Header />
      <h1 style={{textAlign: "center", padding:"25px"}}>Ticket</h1>
      <div className="table-responsive" style={{padding:"25px"}}>
      <table className="table table-hover table-danger">
        <thead>
        <tr className="table-danger">
          <th>Train Number</th>
          <th>Train Name</th>
          <th>From</th>
          <th>To</th>
          <th>Date Of Journey</th>
          <th>Arrival Time(At {from})</th>
          <th>Arrival Time(At {to})</th>
          <th>Passenger Details(Name, Gender, Age)</th>
          <th>Total Cost</th>
        </tr>
        </thead>
        <tbody>
          <tr className="table-info">
          <td rowspan={allPassengers.length}>
              <b>{trainNumber}</b>
            </td>
            <td rowspan={allPassengers.length}>
              <b>{trainName}</b>
            </td>
            <td rowspan={allPassengers.length}>
              <b>{from}</b>
            </td>
            <td rowspan={allPassengers.length}>
              <b>{to}</b>
            </td>
            <td rowspan={allPassengers.length}>
              <b>{dateOfJourney}</b>
            </td>
            <td rowspan={allPassengers.length}>
              <b>{atSrc}</b>
            </td>
            <td rowspan={allPassengers.length}>
              <b>{atDest}</b>
            </td>
            {allPassengers.map((p, index) => {
                return (
                <div>
                  <td>
                    <b>{p.name}</b>
                  </td>
                  <td>
                    <b>{p.age}</b>
                  </td>
                  <td>
                    <b>{p.gender}</b>
                  </td>
                </div>
              );
            })}
            <td rowspan={allPassengers.length}>
              <b>{cost}</b>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center">
        <button className="btn btn-large btn-success" style={{marginRight: "10px"}} onClick={bookTicket}> Book Ticket </button>
        <button className="btn btn-large btn-danger" style={{marginLeft: "10px"}} onClick={cancel}> Cancel </button>
      </div>
      </div>
    </div>
  );
}

export default BookTicket;
