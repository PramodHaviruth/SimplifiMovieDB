import React, { Component } from "react";
import NavBar from "./navBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = { poster: "", name: "", year: "", rating: "", cast: "" };

    this.handlePosterChange = this.handlePosterChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCastChange = this.handleCastChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePosterChange(event) {
    this.setState({ poster: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleYearChange(event) {
    this.setState({ year: event.target.value });
  }

  handleRatingChange(event) {
    this.setState({ rating: event.target.value });
  }

  handleCastChange(event) {
    this.setState({ cast: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost/movies/addmovies", {
        Poster: this.state.poster,
        Name: this.state.name,
        Year: this.state.year,
        Rating: this.state.rating,
        Cast: this.state.cast
      })
      .then(function(response) {
        console.log(response);
        if (response.data.Retcode == 0) {
          console.log("success");
          window.location.href = "/";
        } else {
          console.log("failure");
          alert("Failed to add movie details");
        }
      })
      .catch(function(error) {
        console.log(error);
        alert("Failed to add movie details");
      });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <br />
        <h1 style={{ textAlign: "center" }}>Add Movies</h1>
        <br />
        <Container>
          <Row>
            <Col> </Col>
            <Col xs={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Poster</Form.Label>
                  <Form.Control
                    type="text"
                    name="poster"
                    placeholder="Poster URL"
                    value={this.state.poster}
                    onChange={this.handlePosterChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={this.state.year}
                    onChange={this.handleYearChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="text"
                    name="rating"
                    placeholder="Rating"
                    value={this.state.rating}
                    onChange={this.handleRatingChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Cast</Form.Label>
                  <Form.Control
                    type="text"
                    name="cast"
                    placeholder="Cast"
                    value={this.state.cast}
                    onChange={this.handleCastChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col> </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default AddMovie;
