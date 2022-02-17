const initialState = {
  user: null,
  authorized: undefined,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case "SET_AUTHORIZED":
    return { ...state, authorized: true, user: action.user };

  case "SET_USER_DATA":
    localStorage.setItem("user_token", JSON.stringify(action.payload));
    return { ...state, user: action.payload, authorized: true };

  case "SET_UNAUTHORIZED":
    localStorage.removeItem("user_token");
    return {
      ...state,
      authorized: false,
      user: {
        email: "",
        first_name: "",
        last_name: "",
        level: "",
        points: 0,
        token: "",
      },
    };

  default:
    return state;
  }
};
