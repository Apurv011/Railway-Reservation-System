import React from "react";
import SignUpForm from "./LoginSignup/SignUpForm";
import LogInForm from "./LoginSignup/LogInForm";
import SearchTrain from "./SearchTrain/SearchTrain";
import ResultTrains from "./ResultTrains/ResultTrains";
import TrainInfo from "./TrainInfo/TrainInfo";
import AddPassengers from "./AddPassengers/AddPassengers";
import BookTicket from "./BookTicket/BookTicket";
import UserTicket from "./UserTicket/UserTicket";
import TrainSchedule from "./TrainSchedule/TrainSchedule";
import WelcomePage from "./WelcomePage/WelcomePage";
import UserHome from "./UserHome/UserHome";
import Print from "./PrintTicket/Print";
import PassGen from "./PassGen/PassGen";
import PassForm from "./PassForm/PassForm";
import PassDetails from "./UserPass/PassDetails";
import PrintPass from "./UserPass/PrintPass";
import CollegeAdminPage from "./CollegeAdminPage/CollegeAdminPage";
import RailAdminPage from "./RailAdminPage/RailAdminPage";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Route path="/" exact>
        <WelcomePage />
      </Route>

      <Route path="/userHome" exact>
        <UserHome />
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

      <Route path="/trainSchedule" exact>
        <TrainSchedule />
      </Route>

      <Route path="/myTickets" exact>
        <UserTicket />
      </Route>

      <Route path="/print" exact>
        <Print />
      </Route>

      <Route path="/passGen" exact>
        <PassGen />
      </Route>

      <Route path="/passForm" exact>
        <PassForm />
      </Route>

      <Route path="/myPass" exact>
        <PrintPass />
      </Route>

      <Route path="/collegeAdminPage" exact>
        <CollegeAdminPage />
      </Route>

      <Route path="/railAdminPage" exact>
        <RailAdminPage />
      </Route>

      <Route path="/passDetails" exact>
        <PassDetails />
      </Route>

    </Router>
  );
}

export default App;
