import React, { useEffect, useState, useContext } from "react";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import jwt_decode from "jwt-decode";

const Header = () => {
  const { isLoggedIn, token, dispatch } = useContext(AuthContext);

  let username = "";
  if (token) {
    let decoded = jwt_decode(token);
    username = decoded.username;
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={NavLink} to={isLoggedIn ? "/movies" : "/login"}>
            <span className="fs-4">
              <i className="bi bi-camera-reels-fill me-2"></i> Movie App
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mx-2 my-lg-0">
              {!isLoggedIn && (
                <>
                  <Nav.Link as={NavLink} to="/signup">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}

              {isLoggedIn && (
                <div className="d-flex align-items-center">
                  <p className="pt-3 me-2">Hello, {username}</p>
                  <Button
                    variant="secondary"
                    // size="sm"
                    className="mx-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
