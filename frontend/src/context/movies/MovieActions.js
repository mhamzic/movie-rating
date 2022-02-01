import axios from "axios";

export const getAllMovies = async (token) => {
  try {
    const { data } = await axios.get("/api/movies", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return console.log(error.response.data);
  }
};

export const addFavorites = async (favorite) => {
  try {
    const { data } = await axios.post("/favorites", favorite, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const getFavorites = async (favorite) => {
  try {
    const { data } = await axios.get("/favorites", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const setRating = async (params) => {
  try {
    const { data } = await axios.post(
      `/api/movies/rating/${params.movieid}`,
      {
        rating: params.newRating,
        postedBy: params.userid,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + params.token,
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
