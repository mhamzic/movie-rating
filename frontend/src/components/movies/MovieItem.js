import React from "react";
import { Col, Row } from "react-bootstrap";
import MovieRating from "../shared/MovieRating";

const MovieItem = ({ movie }) => {
  return (
    <>
      <Row className="mb-2">
        <Col xs={12} md={2}>
          <img src={movie.poster} alt="poster" width="100%" />
        </Col>
        <Col xs={12} md={10}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <Row>
            <Col xs={12} md={5}>
              <p>Actors: {movie.actors}</p>
            </Col>
            <Col xs={12} md={5}>
              <p>Released: {new Date(movie.released).toDateString()}</p>
            </Col>
            <Col xs={12} md={2}>
              <MovieRating value={movie.averageRating} id={movie._id} />
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default MovieItem;
