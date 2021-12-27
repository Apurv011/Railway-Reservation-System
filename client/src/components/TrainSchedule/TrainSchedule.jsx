import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import styles from "./TrainSchedule.module.css";

function TrainSchedule(props){

  const location = useLocation();
  let history = useHistory();

  const [trainSch, setTrainSch] = useState([]);
  const [trainNumber, setTrainNumber] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
      };

      axios.get(`http://localhost:5000/trains/${location.state.trainId}`).then(res => {
        setTrainSch(res.data.schedule);
        setTrainNumber(res.data.trainNumber);
        }).catch((error) => {
        history.push("/login");
      });
    }
    else{
      axios.get(`http://localhost:5000/trains/${location.state.trainId}`).then(res => {
        setTrainSch(res.data.schedule);
        setTrainNumber(res.data.trainNumber);
        }).catch((error) => {
        history.push("/login");
      });
    }
  }, [location.state.trainId, history]);

  return (
    <div>
    <Header guest={location.state.guest}/>
    <div style={{paddingTop: "40px"}}>
      <h1 style={{textAlign: "center"}}>Train Schedule</h1>
      <h3 style={{textAlign: "center"}}>Train Number: {trainNumber}</h3>
    </div>
    <div style={{padding: "60px"}} className="container">
      <div className="row">
        <div className="col-md-12">
            <div className="card">
                <div className="card-body">
                    <div id="content">
                        <ul className={`${styles.timeline}`}>
                        {trainSch.map((station, index) => {
                            return (
                            index===0 ?
                            (<li className={`${styles.event}`} data-date={`Departure at - ${station.DT}`}>
                              <h3>{"Source Station Name"}</h3>
                              <p className="mb-1">{station.Station}</p>
                            </li>) :
                            index===trainSch.length-1 ?
                            (<li className={`${styles.event}`} data-date={`Arrival at - ${station.AT}`}>
                                <h3>{"Destination Station Name"}</h3>
                                <p className="mb-1">{station.Station}</p>
                            </li>) :
                            (<li className={`${styles.event}`} data-date={`${station.AT} - ${station.DT}`}>
                                <h3>{"Station Name"}</h3>
                                <p className="mb-1">{station.Station}</p>
                            </li>)
                            );
                          })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  );
}

export default TrainSchedule;
