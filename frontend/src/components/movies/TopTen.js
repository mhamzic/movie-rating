import React, { useContext } from "react";
import MovieContext from "../../context/movies/MovieContext";
import { Row } from "react-bootstrap";
import MovieItem from "./MovieItem";

const TopTen = () => {
  const { movies, loading } = useContext(MovieContext);

  let topTen = movies.slice(0, 10);

  if (!loading) {
    return (
      <>
        {topTen.map((movie) => (
          <MovieItem movie={movie} key={movie._id} />
        ))}
      </>
    );
  } else return <h3>Loading...</h3>;
};

export default TopTen;
