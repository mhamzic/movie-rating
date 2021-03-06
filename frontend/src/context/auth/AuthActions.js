import axios from "axios";

export const login = async (user) => {
  try {
    const { data } = await axios.post("/api/users/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.log(err.response.data);
    alert(err.response.data.error);
  }
};

export const signup = async (user) => {
  try {
    const { data } = await axios.post("/api/users/signup", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.log(err.response.data);
    alert(err.response.data.error);
  }
};
