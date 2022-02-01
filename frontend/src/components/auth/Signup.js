import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import AuthContext from "../../context/auth/AuthContext";
import { signup } from "../../context/auth/AuthActions";

const Signup = (props) => {
  const { token, dispatch } = useContext(AuthContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordConf: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const { password, username, email, passwordConf } = user;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    function validate() {
      let input = user;
      let errors = {};
      let isValid = true;

      if (!input["username"]) {
        isValid = false;
        errors["username"] = "Please enter your username.";
      }

      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }

      if (!input["passwordConf"]) {
        isValid = false;
        errors["passwordConf"] = "Please enter your password.";
      }

      if (input["passwordConf"] !== input["password"]) {
        isValid = false;
        errors["passwordConf"] = "Passwords not matched.";
      }

      if (!input["email"]) {
        isValid = false;
        errors["email"] = "Please enter your email Address.";
      }

      if (typeof input["email"] !== "undefined") {
        var pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }

        setErrors(errors);
        return isValid;
      }
    }

    let isValid = validate();

    if (isValid) {
      try {
        let newUser = { username, password, email };
        const { data } = await signup(newUser);
        alert("User created successfully");
        navigate("/login");
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
      }
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
            isInvalid={errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username && errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            size="sm"
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            size="sm"
            placeholder="Password"
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password && errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="passwordConf"
            onChange={handleChange}
            value={passwordConf}
            size="sm"
            placeholder="Password confirm"
            isInvalid={errors.passwordConf}
          />
          <Form.Control.Feedback type="invalid">
            {errors.passwordConf && errors.passwordConf}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-between">
          <p className="text-muted">
            Have account? <Link to="/login">Login instead</Link>
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Signup;
