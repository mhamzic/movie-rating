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
    return data;
  } catch (err) {
    alert(err.response.data.error)
    console.log(err);
  }
};
