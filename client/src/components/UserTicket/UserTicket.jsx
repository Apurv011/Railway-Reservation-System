import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';

function UserTicket(props){

  const [allTickets, setAllTickets] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(0);

  let history = useHistory();

  useEffect(() => {
      const loggedInUser = localStorage.getItem("userData");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };

        axios.get(`http://localhost:5000/tickets/user/${foundUser.user._id}`, config).then(res => {
          console.log(res.data.tickets);
          setAllTickets(res.data.tickets);
          }).catch((error) => {
          history.push("/login");
        });

      }
      else{
        history.push("/login");
      }
  }, [history]);

  function cancelTicket(ticketId, numOfPassengers, dateOfJourney, trainNumber){

    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      const temp = dateOfJourney.split("-")
      const d = temp[0] + "%2F" + temp[1] + "%2F" + temp[2];

      axios.get(`http://localhost:5000/seats/${trainNumber}/${d}`, config).then(res => {
          setAvailableSeats(res.data.seats[0].availableSeats);
        }).catch((error) => {
        history.push("/login");
      });
      console.log(availableSeats);
      // axios.patch(`http://localhost:5000/tickets/${ticketId}`, config).then(res => {
      //     console.log(res);
      //   }).catch((error) => {
      //   history.push("/login");
      // });
      abc(availableSeats);

      let n = availableSeats + numOfPassengers;
      const update = { "availableSeats":  n};
      console.log(update);

      // axios.patch(`http://localhost:5000/seats/train/${trainNumber}/${d}`, update, config).then(response => {
      //   console.log(response.data);
      // }).catch((error) => {
      //   history.push("/login");
      // });
    }
    else{
      history.push("/login");
    }

    setAllTickets((preValues) => {
      return allTickets.filter((ticket, index) => {
        return ticket._id !== ticketId;
      });
    });

  }

  function abc(a){
    console.log("ABC   " + a);
  }

  return (
    <div>
    <h1>{availableSeats}</h1>
      <Header />
      <h1 style={{textAlign: "center", padding:"25px"}}>My Tickets</h1>
      <div style={{marginLeft:"20px", marginRight:"20px", overflowX:"auto"}}>
        {allTickets.map((ticket, index) => {
            return (
        <div>
        <table className="table table-hover table-striped table-info">
          <thead>
            <tr className="table-danger">
              <th>Train Number</th>
              <th>Train Name</th>
              <th>From</th>
              <th>To</th>
              <th>Date Of Journey</th>
              <th>Date Of Booking</th>
              <th>Passenger Details(Name, Gender, Age)</th>
              <th>Total Cost</th>
              <th>Action</th>
            </tr>
          </thead>
        <tbody>
          <tr className="table-info">
            <td rowspan={ticket.passengers.length}>
              <b>{ticket.trainNumber}</b>
            </td>
            <td rowspan={ticket.passengers.length}>
              <b>{ticket.trainName}</b>
            </td>
            <td rowspan={ticket.passengers.length}>
              <b>{ticket.from}</b>
            </td>
            <td rowspan={ticket.passengers.length}>
              <b>{ticket.to}</b>
            </td>
            <td rowspan={ticket.passengers.length}>
              <b>{ticket.dateOfJourney}</b>
            </td>
            <td rowspan={ticket.passengers.length}>
              <b>{ticket.dateOfReservation}</b>
            </td>
            {ticket.passengers.map((p, index) => {
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
            <td rowspan={ticket.passengers.length}>
              <b>{ticket.cost}</b>
            </td>
            <td>
              <button onClick={() => cancelTicket(ticket._id, ticket.passengers.length, ticket.dateOfJourney, ticket.trainNumber)} className="btn btn-sm btn-outline-danger">Cancel Ticket</button>
            </td>
          </tr>
        </tbody>
        </table>
        </div>
      );
    })}
      </div>
    </div>
  );
}

export default UserTicket;
