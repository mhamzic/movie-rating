import React, { useState, useContext, useEffect } from "react";
import MovieContext from "../../context/movies/MovieContext";
import MovieItem from "./MovieItem";
import { Button } from "react-bootstrap";

const SearchResult = () => {
  const { searchTerm, movies, dispatch } = useContext(MovieContext);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [limit, setLimit] = useState(5);

  const onLoadMore = () => {
    setLimit((prevState) => prevState + 5);
  };

  useEffect(() => {
    const arraySearch = (array, keyword) => {
      const searchTerm = keyword.toLowerCase();
      if (searchTerm === "5 stars") {
        return array.filter((value) => value.averageRating === 5);
      } else if (searchTerm === "at least 3 stars") {
        return array.filter((value) => value.averageRating >= 3);
      } else if (searchTerm === "after 2015") {
        return array.filter(
          (value) => new Date(value.released) > new Date(2015, 0)
        );
      } else if (searchTerm === "older than 5 years") {
        let now = new Date();
        return array.filter((value) => new Date(value.released) < now);
      }

      return array.filter((value) => {
        return (
          value.title.toLowerCase().match(new RegExp(searchTerm, "g")) ||
          value.description.toLowerCase().match(new RegExp(searchTerm, "g")) ||
          value.actors.toLowerCase().match(new RegExp(searchTerm, "g")) ||
          value.released.toLowerCase().match(new RegExp(searchTerm, "g"))
        );
      });
    };

    if (searchTerm.length > 2) {
      let search = arraySearch(movies, searchTerm);
      setFilteredMovies(search);
      // setCount(search.length)
    } else {
      setFilteredMovies(movies);
      // setCount(people.length)
    }
  }, [searchTerm]);

  return (
    <>
      <div>
        {filteredMovies &&
          filteredMovies
            .slice(0, limit)
            .map((movie) => <MovieItem movie={movie} key={movie._id} />)
            .sort((a, b) => a - b)}
      </div>
      {limit < filteredMovies.length && (
        <Button onClick={onLoadMore}>Load more</Button>
      )}
    </>
  );
};

export default SearchResult;
