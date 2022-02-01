const movieReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state, movies: action.payload, loading: false };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_RATING":
      console.log(action.payload);

      return {
        ...state,
        movies: state.movies.map((movie) => {
          if (movie._id !== action.payload.movieId) return movie;
          return { ...movie, averageRating: action.payload.newRating };
        }),
      };

    case "SET_LOADING": {
      return { ...state, loading: true };
    }
    default:
      return state;
  }
};

export default movieReducer;
