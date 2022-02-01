import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import AuthContext from "../../context/auth/AuthContext";
import { login } from "../../context/auth/AuthActions";

const Login = (props) => {
  const { token, dispatch } = useContext(AuthContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const { password, username } = user;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 2 || password.length < 6) {
      setMessage("Please enter valid data.");
    }
    try {
      const { token } = await login(user);
      console.log(token);
      dispatch({ type: "LOGIN", payload: token });
      navigate("/movies");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="w-50 my-5">
      <h3>Please enter credentials</h3>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={username}
            size="sm"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            size="sm"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Text id="passwordHelpBlock" muted className="text-danger">
          {message && message}
        </Form.Text>

        <div className="d-flex justify-content-between">
          <p className="text-muted">
            No account? <Link to="/signup">Sign up</Link>
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
