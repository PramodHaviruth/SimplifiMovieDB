import React, { Component } from "react";
// import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {};
  navBarStyle = {
    backgroundColor: "#519dde",
    color: "#ffffff",
    fontWeight: "bold"
  };
  render() {
    return (
      <nav className="navbar navbar-light" style={this.navBarStyle}>
        <div className="navbar-brand text-white" href="#">
          <img
            src="http://clipart-library.com/img/1518211.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          {"  "}
          Simplifi Movie DB
        </div>

        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link  text-white" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/addMovies">
              Add Movies
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link text-white" href="/login">
              Login
            </a>
          </li> */}
        </ul>
      </nav>
    );
  }
}

export default NavBar;
