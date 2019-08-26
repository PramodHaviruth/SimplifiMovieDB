import React, { Component } from "react";
import NavBar from "./navBar";
import MoviesList from "./moviesList";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <br />
        <h1 style={{ textAlign: "center" }}>Movie List</h1>
        <br />
        <MoviesList></MoviesList>
      </React.Fragment>
    );
  }
}

export default Home;
