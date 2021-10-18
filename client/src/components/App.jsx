import React from "react";
import SignUpForm from "./LoginSignup/SignUpForm";
import LogInForm from "./LoginSignup/LogInForm";
import SearchTrain from "./SearchTrain/SearchTrain";
import ResultTrains from "./ResultTrains/ResultTrains";
import TrainInfo from "./TrainInfo/TrainInfo";
import AddPassengers from "./AddPassengers/AddPassengers";
import BookTicket from "./BookTicket/BookTicket";
import UserTicket from "./UserTicket/UserTicket";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Route path="/" exact>
        <SignUpForm />
      </Route>

      <Route path="/signup" exact>
        <SignUpForm />
      </Route>

      <Route path="/login" exact>
        <LogInForm />
      </Route>

      <Route path="/searchTrain" exact>
        <SearchTrain />
      </Route>

      <Route path="/resultTrains" exact>
        <ResultTrains />
      </Route>

      <Route path="/trainInfo" exact>
        <TrainInfo />
      </Route>

      <Route path="/addPassengers" exact>
        <AddPassengers />
      </Route>

      <Route path="/bookTicket" exact>
        <BookTicket />
      </Route>

      <Route path="/myTickets" exact>
        <UserTicket />
      </Route>

    </Router>
  );
}

export default App;
