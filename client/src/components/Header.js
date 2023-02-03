import "../App.css";
import "./styles/Header.css";

import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <div className="ui massive menu">
      <div className="left menu">
        <h2>Streamer</h2>
      </div>

      <div className="right menu">
        <Link to="/">
          <button className="header-left-btn">Show streams</button>
        </Link>
        <GoogleAuth />
      </div>
     
    </div>
  );
};

export default Header;
