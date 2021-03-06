import React from "react";
import { useHistory } from 'react-router-dom';

function Header(props){

  let history = useHistory();

  function logout(){
    localStorage.clear();
    history.push('/');
  }

  function myTicket(){
    history.push('/myTickets');
  }

  function myPass(){
    history.push('/passDetails');
  }

  function searchPage(){
    history.push({
        pathname: '/searchTrain',
        state: { guest: props.guest}
    });
  }

  function userHome(){
    history.push('/userHome');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="btn btn-link navbar-brand" onClick={searchPage}>Reservation System</button>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
        {props.guest!==true &&
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {props.page!=="Home" && <button onClick={searchPage} className="nav-link btn btn-link">Home</button> }
          </li>
          <li className="nav-item">
            {props.page!=="User Home" && <button onClick={userHome} className="nav-link btn btn-link">My Details</button> }
          </li>
          <li className="nav-item">
            {props.page!=="My Pass" && <button onClick={myPass} className="nav-link btn btn-link">My Pass</button> }
          </li>
          <li className="nav-item">
            {props.page!=="My Tickets" && <button onClick={myTicket} className="nav-link btn btn-link">My Tickets</button> }
          </li>
          <li className="nav-item">
            <button onClick={logout} className="nav-link btn btn-link">Logout</button>
          </li>
        </ul>
      }
      </div>
    </nav>
  </div>
  );
}

export default Header;
