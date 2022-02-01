import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import AuthContext from "../../context/auth/AuthContext";
import { login } from "../../context/auth/AuthActions";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { password, username } = user;

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
      setErrors(errors);
      return isValid;
    }

    let isValid = validate();
    if (isValid) {
      try {
        const { token } = await login(user);
        dispatch({ type: "LOGIN", payload: token });
        navigate("/movies");
      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data);
      }
    }
  };

  const responseSuccessGoogle = async (response) => {
    try {
      const { data } = await axios.post(
        "/api/users/googlelogin",
        { tokenId: response.tokenId },
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch({ type: "LOGIN", payload: data });
      navigate("/movies");
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const responseErrorGoogle = () => {};

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

        <div className="d-flex justify-content-between">
          <p className="text-muted">
            No account? <Link to="/signup">Sign up</Link>
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      <div className="d-flex justify-content-center mt-5">
        <GoogleLogin
          clientId="328895224341-mr3jsd1bquuf9vb3qsop6pm8crssjj1r.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </Container>
  );
};

export default Login;
