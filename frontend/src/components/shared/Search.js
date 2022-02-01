import { useState, useContext } from "react";
import { Form, FormControl } from "react-bootstrap";
import MovieContext from "../../context/movies/MovieContext";

const Search = () => {
  const { dispatch } = useContext(MovieContext);

  return (
    <Form className="d-flex">
      <FormControl
        type="text"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        size="lg"
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH", payload: e.target.value })
        }
      />
    </Form>
  );
};

export default Search;
