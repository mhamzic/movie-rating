import React, { useState, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import jwt_decode from "jwt-decode";
import MovieContext from "../../context/movies/MovieContext";
import AuthContext from "../../context/auth/AuthContext";
import { setRating, getAllMovies } from "../../context/movies/MovieActions";

const MovieRating = (props) => {
  const { movie, dispatch } = useContext(MovieContext);
  const { token } = useContext(AuthContext);
  console.log(props.value);

  const { user_id } = jwt_decode(token);

  const ratingChanged = async (newRating) => {
    let params = { newRating, movieid: props.id, userid: user_id, token };
    let updatedMovie = await setRating(params);
    const allMovies = await getAllMovies(token);
    dispatch({ type: "GET_MOVIES", payload: allMovies });
    // dispatch({
    //   type: "SET_RATING",
    //   payload: { newRating: updatedMovie.averageRating, movieId: props.id },
    // });
  };

  const starRating = {
    count: 5,
    edit: true,
    value: props.value,
    size: 20,
    activeColor: "#ffd700",
    emptyIcon: <i className="bi bi-star"></i>,
    halfIcon: <i className="bi bi-star-half"></i>,
    filledIcon: <i className="bi bi-star-fill"></i>,
    onChange: ratingChanged,
  };

  return (
    <>
      <ReactStars {...starRating} />
    </>
  );
};

export default MovieRating;
