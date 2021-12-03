import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';

function AddPassengers(props){

  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (!loggedInUser || !location.state) {
      history.push("/login");
    }
  });

  const [b, setB] = useState(false);
  const [uGender, setUGender] = useState("");
  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: ""
  });
  const [ allPassengers, setAllPassengers] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setPassenger((preValues) => {
      return {
        ...preValues,
        [name]: value,
        gender: uGender
      };
    });
  }

  function removePassenger(name){
    let temp = false;
    if(allPassengers.length===1){
      temp = true;
    }
    setAllPassengers(allPassengers.filter(psg => psg.name !== name));
    if(temp){
      setB(false);
    }
  }

  function confirm(){
    console.log(allPassengers);
    history.push({
          pathname: '/bookTicket',
          state: { trainId: location.state.trainId, trainName: location.state.trainName, trainNumber: location.state.trainNumber,
                  from: location.state.from, to: location.state.to, cost: location.state.cost, passengers: allPassengers,
                  atSrc: location.state.atSrc, atDest: location.state.atDest, seatId: location.state.seatId,
                  dateOfJourney: location.state.dateOfJourney, availableSeats: location.state.availableSeats, cancelledSeats: location.state.cancelledSeats }
      });
  }

  function setGender(event){
    console.log(event.target.value);
    setUGender(event.target.value);
    setPassenger((preValues) => {
      return {
        ...preValues,
        gender: event.target.value
      };
    });
  }

  function addPassenger(){
    setAllPassengers(preValues => [...preValues, passenger]);
    setB(true);
    setPassenger({
      name: "",
      age: 0,
      gender: ""
    });
    setUGender("");
};

  return (
    <div>
      <Header/>
      <div className="d-flex justify-content-center" style={{paddingTop: "30px"}}>
        <div className="d-flex justify-content-center">
          <div className="card bg-light mb-3">
            <div className="card-header bg-dark">
              <h3 style={{color: "#ffffff"}} className="d-flex justify-content-center">
                Add Passenger Information
              </h3>
            </div>
            <div className="card-body">
              <h5 className="card-title">

                <form>
                  <div className="form-row">
                    <div className="col">
                      <label htmlFor="passengerName">Passenger Name</label>
                      <input onChange={handleChange} className="form-control form-control-user" type="text" id="exampleFirstName" placeholder="Name" name="name" value={passenger.name} />
                    </div>
                    <div className="col">
                      <label htmlFor="gender">Passenger Age</label>
                      <input onChange={handleChange} className="form-control form-control-user" type="number" id="exampleFirstName" name="age" placeholder="Age" min="0" value={passenger.age} />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="male"
                        value="Male"
                        checked={uGender === 'Male'}
                        onChange={setGender}
                      />
                      <label className="form-check-label" htmlFor="gender">
                        Male
                      </label>
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="female"
                          value="Female"
                          checked={uGender === 'Female'}
                          onChange={setGender}
                        />
                        <label className="form-check-label" htmlFor="gender">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr />

                </form>
              </h5>
            </div>
            <div style={{margin:"5px"}}>
              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
                onClick={addPassenger}
              >
              Add Passenger
              </button>
            </div>
            </div>
            </div>

            </div>
            {b && <h5 style={{textAlign:"center"}}>All Passengers </h5>}
            {
              b  &&
                allPassengers.map((p, index) => {
                    return (
                      <div style={{marginTop: "30px"}} className="table-responsive container">
                      <table className="table table-hover table-warning">
                        <thead>
                          <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Age</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Action</th>
                          </tr>
                        </thead>
                      <tbody>
                        <tr className="table-info">
                          <td>
                            <b>{p.name}</b>
                          </td>
                          <td>
                            <b>{p.age}</b>
                          </td>
                          <td>
                            <b>{p.gender}</b>
                          </td>
                          <td>
                            <button onClick={() => removePassenger(p.name)} className="btn btn-sm btn-outline-danger">Remove</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                    );
                  })
            }
            {b &&
              <div className="container" style={{marginTop: "20px"}}>
                <h5>Total Cost: {location.state.cost*allPassengers.length} </h5>
              </div>
            }
            { b &&
              <div className="container" style={{textAlign:"center"}}>
                <button
                style={{marginBottom:"40px"}}
                  type="submit"
                  className="btn btn-dark btn-lg"
                  onClick={confirm}
                >
                  Confirm
                </button>
              </div>
            }


    </div>
  );
}

export default AddPassengers;
