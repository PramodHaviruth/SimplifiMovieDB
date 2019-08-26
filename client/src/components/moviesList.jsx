import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import Cast from "./castDetails";

class MoviesList extends Component {
  state = { Movies: [] };
  componentDidMount() {
    fetch("http://localhost/movies")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            Movies: result
          });

          console.log(this.state.Movies);
        },
        error => {}
      );
  }
  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Name</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Cast</th>
          </tr>
        </thead>
        <tbody>
          {this.state.Movies.map(movie => (
            <tr key={movie.ID}>
              <td>
                <img
                  src={movie.Poster}
                  style={{ width: "50px", height: "50px" }}
                  className="card-img-top"
                />
              </td>
              <td>{movie.Name}</td>
              <td>{movie.Year}</td>
              <td>{movie.Rating}</td>
              <td>
                <Link
                  to={`/Cast/${movie.ID}`}
                  style={{
                    color: "#000000",
                    textDecoration: "none"
                  }}
                  params={{ movieID: movie.ID }}
                >
                  <Button variant="primary">View</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default MoviesList;
