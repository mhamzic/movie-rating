import React from "react";
import { Container } from "react-bootstrap";

const MainFooter = () => {
  const year = new Date().getFullYear();
  return (
    <Container
      fluid
      className="bg-dark mt-5 p-3 align-self-baseline fixed-bottom"
    >
      <Container>
        <h6 className="text-center text-light">
          Copyright &copy; {year}
          {" | "}
          <span className="text-light">Movie App</span>
        </h6>
      </Container>
    </Container>
  );
};

export default MainFooter;
