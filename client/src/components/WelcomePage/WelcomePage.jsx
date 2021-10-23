import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./WelcomePage.module.css";

function WelcomePage() {
  let history = useHistory();

  function login() {
    history.push("/login");
  }

  function signup() {
    history.push("/signup");
  }

  return (
    <div className={`${styles.center}`}>
      <h1
        className="text-dark"
        style={{ textAlign: "center", fontSize: "75px" }}
      >
        Reservation System
      </h1>
      <p
        className="text-dark"
        style={{ fontSize: "30px", textAlign: "center", marginTop: "35px" , marginBottom:"40px"}}
      >
        Login Now to Book your Journey!
      </p>
      <div className="row" style={{width: "25%", margin: "0 auto"}}>
        <div onClick={signup} style={{marginBottom: "20px", marginRight:"5px" }} className={styles.btn}>
          Signup
        </div>
        <div onClick={login} style={{ marginBottom: "40px", marginLeft:"5px" }} className={styles.btn}>
          Login
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;