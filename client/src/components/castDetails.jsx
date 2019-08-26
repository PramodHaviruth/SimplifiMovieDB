import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import NavBar from "./navBar";
import axios from "axios";

class CastDetails extends Component {
  constructor(props) {
    super(props);
    console.dir("this is prop =" + props.match.params.MovieId);
    console.dir(props.match.params);

    this.state = {
      MovieDetails: [],
      movieID: props.match.params.MovieId
    };
  }
  componentDidMount() {
    fetch(`http://localhost/movies/cast/${this.state.movieID}`, {
      withCredentials: true,
      credentials: "include"
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          if (result.Retcode === 1) {
            window.location = "/login";
          } else {
            this.setState({
              MovieDetails: result
            });
          }

          console.log(this.state.MovieDetails);
        },

        error => {}
      );
  }
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <br />
        <h1 style={{ textAlign: "center" }}>Movie Details</h1>
        <br />

        {this.state.MovieDetails.map(movie => (
          <Table striped>
            <tbody>
              <tr>
                <td>
                  <center>
                    <img
                      src={movie.Poster}
                      style={{ width: "250px", height: "300px" }}
                      className="card-img-top"
                    />
                  </center>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Name</h3>
                </td>
                <td>
                  <span></span>
                  {movie.Name}
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Year</h3>
                </td>
                <td>
                  <span></span>
                  {movie.Year}
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Rating</h3>
                </td>
                <td>
                  <span></span>
                  {movie.Rating}
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Cast</h3>
                </td>
                <td>
                  <span></span>
                  {movie.Cast}
                </td>
              </tr>
            </tbody>
          </Table>
        ))}
      </React.Fragment>
    );
  }
}

export default CastDetails;
