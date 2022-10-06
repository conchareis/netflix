import React, { useEffect, useState } from "react";
import "../css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
// import { mdiAccount } from "@mdi/js";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    // <Switch>
    //   <Route path="/"></Route>
    <div className={`navbar ${show && "navbar_black"}`}>
      <div className="container">
        <div className="container_left">
          <img
            className="navbar_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
            alt="Netflix Logo"
          />
          <span>Homepage</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="container_right">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          <span>Kids</span>
          <FontAwesomeIcon icon={faBell} className="icon" />
          <img
            className="navbar_avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt="Netflix Avatar"
          />
          <div className="profile">
            <FontAwesomeIcon icon={faCaretDown} className="icon_down" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Switch>
  );
}
