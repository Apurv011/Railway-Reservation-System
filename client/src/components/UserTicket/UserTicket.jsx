import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';
import TicketTable from "./TicketTable";

function UserTicket(props){

  const [allTodayTickets, setAllTodayTickets] = useState([]);
  const [cancelledSeats, setCancelledSeats] = useState([]);
  const [allUpcomingTickets, setAllUpcomingTickets] = useState([]);
  const [allHistoryTickets, setAllHistoryTickets] = useState([]);
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

        getTickets(foundUser, config);

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

  function getTickets(foundUser, config){
    axios.get(`http://localhost:5000/tickets/user/${foundUser.user._id}`, config).then(res => {
      console.log(res.data.tickets);
      setAllTodayTickets(res.data.tickets.filter((ticket) => {
        const temp = ticket.dateOfJourney.split("-");
        const d = temp[2] + "-" + temp[1] + "-" + temp[0];
        const obj =  new Date(d);
        var today = new Date();
        const diffTime = obj.getTime() - today.getTime();
        const diffDays = (diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        return diffDays>-1 && diffDays<=0;
      }));
      setAllUpcomingTickets(res.data.tickets.filter((ticket) => {
        const temp = ticket.dateOfJourney.split("-");
        const d = temp[2] + "-" + temp[1] + "-" + temp[0];
        const obj =  new Date(d);
        var today = new Date();
        const diffTime = obj.getTime() - today.getTime();
        const diffDays = (diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        return diffDays>0;
      }));
      setAllHistoryTickets(res.data.tickets.filter((ticket) => {
        const temp = ticket.dateOfJourney.split("-");
        const d = temp[2] + "-" + temp[1] + "-" + temp[0];
        const obj =  new Date(d);
        var today = new Date();
        const diffTime = obj.getTime() - today.getTime();
        const diffDays = (diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        return diffDays<=-1;
      }));
      }).catch((error) => {
      history.push("/login");
    });
  }

  function updateAvailableSetats(ticketId, passengers, dateOfJourney, trainNumber){
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
      var ls = [];
      for(var i=0; i<passengers.length; i++){
        var num = (parseInt(passengers[i].seat.split('-')[0].substring(1)) - 1)*100 + parseInt(passengers[i].seat.split('-')[1]);
        ls.push(num);
        console.log(num);
       }
       setCancelledSeats(ls);
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
      const update = { "cancelledSeats":  cancelledSeats};
      console.log(update);

      axios.patch(`http://localhost:5000/seats/train/${trainNum}/${date}`, update, config).then(response => {
        console.log(response.data);
      }).catch((error) => {
        history.push("/login");
      });

      const change = { "isCancelled":  true};
      axios.patch(`http://localhost:5000/tickets/${ticketId}`, change, config).then(response => {
        axios.get(`http://localhost:5000/tickets/cancelled/${foundUser.user._id}`, config).then(res => {
          setCancelledTickets(res.data.tickets);
          }).catch((error) => {
          history.push("/login");
        });
      }).catch((error) => {
        history.push("/login");
      });
    }
    else{
      history.push("/login");
    }

    setAllTodayTickets((preValues) => {
      return allTodayTickets.filter((ticket, index) => {
        return ticket._id !== ticketId;
      });
    });

    setAllUpcomingTickets((preValues) => {
      return allUpcomingTickets.filter((ticket, index) => {
        return ticket._id !== ticketId;
      });
    });

    setAllHistoryTickets((preValues) => {
      return allHistoryTickets.filter((ticket, index) => {
        return ticket._id !== ticketId;
      });
    });

  }

  return (
    <div>
      <Header page="My Tickets"/>
      <TicketTable
        heading="Todays's Journey"
        allTickets={allTodayTickets}
        updateAvailableSetats={updateAvailableSetats}
        color="#2c3e50"
      />
      <TicketTable
        heading="Upcoming Journey"
        allTickets={allUpcomingTickets}
        updateAvailableSetats={updateAvailableSetats}
        color="#2ecc71"
      />
      <TicketTable
        heading="Journey History"
        allTickets={allHistoryTickets}
        updateAvailableSetats={updateAvailableSetats}
        color="#2c3e50"
      />
      <TicketTable
        heading="Cancelled Tickets"
        allTickets={cancelledTickets}
        updateAvailableSetats={updateAvailableSetats}
        color="#d63031"
      />
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
