import React from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordMain = watch("password", "");

  const onSubmit = async (data) => {
    try {
      await dispatch(signupUser({ userInfo: data })).unwrap();
      dispatch(
        alertActions.showAlert({
          text: "Registration successful.",
          type: "info",
        })
      );
      navigate("/login");
    } catch (error) {
      dispatch(alertActions.showAlert({ text: error.error, type: "error" }));
    }
  };

  return (
    <Container className="my-5 pb-5 d-flex justify-content-center">
      <div className="w-50">
        <h3>Create your account</h3>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              size="sm"
              {...register("username", {
                required: "Username is required",
                min: { value: 3, message: "Too short." },
                maxLength: { value: 30, message: "Too long." },
              })}
              isInvalid={errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username && errors.username.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              size="sm"
              placeholder="Email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address. Please check your input.",
                },
              })}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              size="sm"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password too short." },
              })}
              isInvalid={errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password && errors.password.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordconf">
            <Form.Control
              type="password"
              name="passwordconf"
              size="sm"
              placeholder="Confirm password"
              {...register("passwordconf", {
                validate: (value) =>
                  value === passwordMain || "The passwords do not match",
              })}
              isInvalid={errors.passwordconf}
            />
            <Form.Control.Feedback type="invalid">
              {errors.passwordconf && errors.passwordconf.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-between py-4">
            <p className="text-muted">
              Already have an account? <Link to="/login">Login in</Link>
            </p>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
