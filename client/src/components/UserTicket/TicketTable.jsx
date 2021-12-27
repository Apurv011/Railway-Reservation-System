import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

function TicketTable(props){

  let history = useHistory();

  return (
    <div>
      <h1 style={{ paddingLeft:"25px", paddingTop:"25px", color: props.color }}>{props.heading}</h1>
      {props.allTickets.length<1 && <h5 style={{paddingLeft: "25px"}}>No Tickets</h5>}
        {props.allTickets.length>=1 &&
        <div className="table-responsive" style={{padding:"25px"}}>
        <table className="table table-hover table-light">
          <thead>
            <tr className="bg-dark">
              <th style={{color:"#ffffff"}}>Train Number</th>
              <th style={{color:"#ffffff"}}>Train Name</th>
              <th style={{color:"#ffffff"}}>From</th>
              <th style={{color:"#ffffff"}}>To</th>
              <th style={{color:"#ffffff"}}>Date Of Journey</th>
              <th style={{color:"#ffffff"}}>Date Of Booking</th>
              <th style={{color:"#ffffff"}}>Passenger Details</th>
              <th style={{color:"#ffffff"}}>Total Cost</th>
              {
              props.heading!=="Journey History" && props.heading!=="Cancelled Tickets" &&
              <th style={{color:"#ffffff"}}>Print Ticket</th>
              }
              {
              props.heading!=="Journey History" && props.heading!=="Cancelled Tickets" &&
              <th style={{color:"#ffffff"}}>Cancel Ticket</th>
              }
            </tr>
          </thead>
        {props.allTickets.reverse().map((ticket, index) => {
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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  {props.heading!=="Cancelled Tickets" && <th scope="col">Seat</th>}
                </tr>
              </thead>
              {ticket.passengers.map((p, index) => {
                return (
                  <tbody>
                    <tr>
                      <td scope="row">{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.gender}</td>
                      {props.heading!=="Cancelled Tickets" && <td>{p.seat}</td>}
                    </tr>
                  </tbody>
                );
              })}
            </table>
            <td rowspan={ticket.passengers.length}>
              <b>{ticket.cost}</b>
            </td>
            {props.heading!=="Journey History" && props.heading!=="Cancelled Tickets" && <td>
              <button data-toggle="modal" data-target="#exampleModalCenter"
              onClick={() => {
                history.push({
                  pathname: '/print',
                  state: { ticket: ticket}
                });
              }
              }
              className="btn btn-sm btn-outline-dark">Print Ticket</button>
            </td>
            }
            {props.heading!=="Journey History" && props.heading!=="Cancelled Tickets" && <td>
              <button data-toggle="modal" data-target="#exampleModalCenter" onClick={() => props.updateAvailableSetats(ticket._id, ticket.passengers, ticket.dateOfJourney, ticket.trainNumber)} className="btn btn-sm btn-outline-danger">Cancel Ticket</button>
            </td>
            }
          </tr>
        </tbody>
      );
    })}
    </table>
    </div>
  }
    </div>
  );
}

export default TicketTable;
