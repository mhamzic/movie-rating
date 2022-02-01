const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("jwt", action.payload);
      return { ...state, token: action.payload, isLoggedIn: !!action.payload };
    }
    case "LOGOUT": {
      localStorage.removeItem("jwt");
      return { ...state, token: "", isLoggedIn: false };
    }
    default:
      return state;
  }
};

export default authReducer;
