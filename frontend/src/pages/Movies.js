import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Search from "../components/shared/Search";
import { getAllMovies } from "../context/movies/MovieActions";
import AuthContext from "../context/auth/AuthContext";
import MovieContext from "../context/movies/MovieContext";
import TopTen from "../components/movies/TopTen";
import SearchResult from "../components/movies/SearchResult";

const Movies = () => {
  const { token } = useContext(AuthContext);
  const { dispatch, searchTerm } = useContext(MovieContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const getMoviesFromDB = async () => {
      const allMovies = await getAllMovies(token);
      dispatch({ type: "GET_MOVIES", payload: allMovies });
    };
    getMoviesFromDB();
  }, []);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <Container className="mx-auto my-5 pb-5">
      <h2 className="mb-5">Search database</h2>
      <Search />
      <div className="d-flex align-items-center my-4">
        <p className="me-2">Show Top 10</p>
        <label className="switch">
          <input type="checkbox" value={isChecked} onChange={handleChange} />
          <span className="slider round"></span>
        </label>
      </div>
      {isChecked && <TopTen />}
      {!isChecked && searchTerm.length >= 2 && <SearchResult />}
    </Container>
  );
};

export default Movies;
