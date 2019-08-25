import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "react-router-dom/Route";
import Home from "./components/homePage";
import Cast from "./components/castDetails";
import Login from "./components/login";
import AddMovies from "./components/addMovies";

function App() {
  return (
    <Router>
      <Route path="/" exact strict component={Home} />
      <Route path="/addmovies" exact strict component={AddMovies} />
      <Route path="/cast/:MovieId" exact strict component={Cast} />
      <Route path="/login" exact strict component={Login} />
    </Router>
  );
}

export default App;
