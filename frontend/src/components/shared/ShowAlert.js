import React from "react";
import { Alert, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";

const ShowAlert = (props) => {
  const text = useSelector((state) => state.alert.text);
  const type = useSelector((state) => state.alert.type);
  const show = useSelector((state) => state.alert.show);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(alertActions.closeAlert());
  }, 10000);

  return (
    <Container>
      {show && (
        <Alert
          variant={type === "error" ? "danger" : "info"}
          onClose={() => dispatch(alertActions.closeAlert())}
          dismissible
          className="my-5"
          style={{ zIndex: "999" }}
        >
          {type === "error" ? (
            <Alert.Heading>Error</Alert.Heading>
          ) : (
            <Alert.Heading>Info</Alert.Heading>
          )}
          <p>{text}</p>
        </Alert>
      )}
    </Container>
  );
};

export default ShowAlert;
