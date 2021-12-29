import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import {useLocation } from 'react-router-dom';

const PrintTicket = React.forwardRef((props, ref) =>{

  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    console.log(location.state.ticket);
  });

  return (
    <div ref={ref}>
    <div className="d-flex justify-content-center" style={{marginTop: "80px"}}>
        <div className="card bg-light mb-3">
          <div className="card-header bg-dark">
            <h3 style={{color:"#ffffff"}} className="d-flex justify-content-center">Your Ticket</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <form>
                <div className="form-row">
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="text-center d-flex justify-content-center">
                      <label htmlFor="trainNumber">Train Number</label>
                    </h4>
                    <h3 className="text-center d-flex justify-content-center">
                      <b>{props.ticket.trainNumber}</b>
                    </h3>
                  </div>

                  <hr />
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="text-center d-flex justify-content-center">
                      <label htmlFor="trainName">Train Name</label>
                    </h4>
                    <h3 className="d-flex justify-content-center">
                      <b>{props.ticket.trainName}</b>
                    </h3>
                  </div>
                </div>

                <hr />
                <div className="form-row">
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="text-center d-flex justify-content-center">
                      <label htmlFor="inputState">Your Boarding Station</label>
                    </h4>
                    <h3 className="text-center d-flex justify-content-center">
                      <b>{props.ticket.from}</b>
                    </h3>
                  </div>

                  <hr />
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="text-center d-flex justify-content-center">
                      <label htmlFor="inputState">Your Destination Station</label>
                    </h4>
                    <h3 className="text-center d-flex justify-content-center">
                      <b>{props.ticket.to}</b>
                    </h3>
                  </div>
                </div>

                <hr />

                <div className="form-row">
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="text-center d-flex justify-content-center">
                      <label htmlFor="inputState">Arrival Time at {location.state.ticket.from}</label>
                    </h4>
                    <h3 className="text-center d-flex justify-content-center">
                      <b>{props.ticket.atSrc}</b>
                    </h3>
                  </div>

                  <hr />

                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="text-center d-flex justify-content-center">
                      <label htmlFor="inputState">Arrival Time at {location.state.ticket.to}</label>
                    </h4>
                    <h3 className="text-center d-flex justify-content-center">
                      <b>{props.ticket.atDest}</b>
                    </h3>
                  </div>
                </div>

                <hr />

                <div className="form-row">
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="text-center d-flex justify-content-center">
                      <label htmlFor="inputState">Date of Journey</label>
                    </h4>
                    <h3 className="text-center d-flex justify-content-center">
                      <b>{props.ticket.dateOfJourney}</b>
                    </h3>
                  </div>

                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="text-center d-flex justify-content-center">
                      <label htmlFor="inputState">Date of Booking</label>
                    </h4>
                    <h3 className="text-center d-flex justify-content-center">
                      <b>{props.ticket.dateOfReservation}</b>
                    </h3>
                  </div>
                </div>

                <hr />

                <div className="col" style={{padding: "30px"}}>
                  <h4 className="text-center d-flex justify-content-center">
                    <label htmlFor="inputState">Passengers</label>
                  </h4>
                  <p className="text-center d-flex justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <td scope="col">Name</td>
                      <td scope="col">Age</td>
                      <td scope="col">Gender</td>
                      <td scope="col">Seat</td>
                    </tr>
                  </thead>
                  {props.ticket.passengers.map((p, index) => {
                    return (
                      <tbody>
                        <tr>
                          <td scope="row">{p.name}</td>
                          <td>{p.age}</td>
                          <td>{p.gender}</td>
                          <td>{p.seat}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                </p>
                </div>

                <hr />

                <div className="form-row">
                  <div className="col" style={{padding: "30px"}}>
                    <h4 className="text-center d-flex justify-content-center">
                      <label htmlFor="inputState">Total Fair</label>
                    </h4>
                    <h3 className="text-center d-flex justify-content-center">
                      <b>{props.ticket.cost}</b>
                    </h3>
                  </div>

                  <div style={{margin:"auto"}} className="col text-center">
                    <h2 className="text-success">
                      <label>Paid</label>
                    </h2>
                  </div>

                </div>

              </form>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
  });

export default PrintTicket;
