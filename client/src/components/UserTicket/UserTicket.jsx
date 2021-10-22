import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';

function UserTicket(props){

  const [allTickets, setAllTickets] = useState([]);
  const [cancelledTickets, setCancelledTickets] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [ticketId, setTicketId] = useState("");
  const [trainNum, setTrainNum] = useState("");
  const [date, setDate] = useState("");
  const [numOfPsg, setNumOfPsg] = useState(0);

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

        axios.get(`http://localhost:5000/tickets/cancelled/${foundUser.user._id}`, config).then(res => {
          console.log(res.data.tickets);
          setCancelledTickets(res.data.tickets);
          }).catch((error) => {
          history.push("/login");
        });

      }
      else{
        history.push("/login");
      }
  }, [history]);

  function updateAvailableSetats(ticketId, numOfPassengers, dateOfJourney, trainNumber){
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      const temp = dateOfJourney.split("-")
      const d = temp[0] + "%2F" + temp[1] + "%2F" + temp[2];
      setDate(d);
      setTrainNum(trainNumber);
      setTicketId(ticketId);
      setNumOfPsg(numOfPassengers);
      axios.get(`http://localhost:5000/seats/${trainNumber}/${d}`, config).then(res => {
          setAvailableSeats(res.data.seats[0].availableSeats);
        }).catch((error) => {
        history.push("/login");
      });
    }
  }

  function cancelTicket(){

    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      console.log(availableSeats);
      let n = availableSeats + numOfPsg;
      const update = { "availableSeats":  n};
      console.log(update);

      axios.patch(`http://localhost:5000/seats/train/${trainNum}/${date}`, update, config).then(response => {
        console.log(response.data);
      }).catch((error) => {
        history.push("/login");
      });

      const change = { "isCancelled":  true};
      axios.patch(`http://localhost:5000/tickets/${ticketId}`, change, config).then(response => {
        console.log(response.data);
      }).catch((error) => {
        history.push("/login");
      });

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

  return (
    <div>
      <Header page="My Tickets"/>
      <h1 style={{ paddingLeft:"25px", paddingTop:"25px"}}>My Tickets</h1>
      {allTickets.length<1 && <h5 style={{paddingLeft: "25px"}}>No Tickets</h5>}
        <div className="table-responsive" style={{padding:"25px"}}>
        <table className="table table-hover table-danger">
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
        {allTickets.map((ticket, index) => {
            return (
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
              <button data-toggle="modal" data-target="#exampleModalCenter" onClick={() => updateAvailableSetats(ticket._id, ticket.passengers.length, ticket.dateOfJourney, ticket.trainNumber)} className="btn btn-sm btn-outline-danger">Cancel Ticket</button>
            </td>
          </tr>
        </tbody>
      );
    })}
    </table>
    </div>
    <h1 style={{ paddingLeft:"25px", paddingTop:"25px", color:"#d63031"}}>Cancelled Tickets</h1>
    {cancelledTickets.length<1 && <h5 style={{paddingLeft: "25px"}}>No Tickets</h5>}
        {cancelledTickets.map((ticket, index) => {
            return (
              <div className="table-responsive" style={{padding:"25px"}}>
              <table className="table table-hover table-danger">
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
                    {cancelledTickets.length<1 && <h5 style={{marginLeft: "10px"}}>No Tickets</h5>}
                    <td rowspan={ticket.passengers.length}>
                      <b>{ticket.cost}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      <div className="modal fade" id="exampleModalCenter">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Click Done to Cancel Ticket</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => cancelTicket()}
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

export default UserTicket;
