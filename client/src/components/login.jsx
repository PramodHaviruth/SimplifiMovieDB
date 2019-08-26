import React, { Component } from "react";
import NavBar from "./navBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost/movies/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(function(response) {
        console.log(response);
        if (response.data.Retcode == 0) {
          console.log("success");
          window.location.href = "/";
        } else {
          console.log("failure");
          alert("Login Failed, Please check your Login Id and Password");
        }
      })
      .catch(function(error) {
        console.log(error);
        alert("Login Failed, Please check your Login Id and Password");
      });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <br />
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <br />
        <Container>
          <Row>
            <Col> </Col>
            <Col xs={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="UserName"
                    value={this.state.username}
                    onChange={this.handleUserNameChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
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

export default Login;
