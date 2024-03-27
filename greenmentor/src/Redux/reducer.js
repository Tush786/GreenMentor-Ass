import {
    EDIT_TASK,
    EDIT_USER,
    GET_TASK,
    GET_USER,
    LOADING,
    LOGIN_USER,
    LOGOUT_USER,
    NOT_LOADING,
    POST_USER,
    REMOVE_TASK,
    RESET_USER,
  } from "../Redux/actiontype";
  
  const initialState = {
    user: {},
    loggedIn: false,
    status: "",
    token: "",
    Taskdata: [],
    isLoading: false,
  };
  
  export const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_USER:
        return { ...state, user: payload };
      case EDIT_USER:
        return { ...state, user: payload };
      case POST_USER:
        return { ...state, status: payload };
      case LOGIN_USER:
        return {
          ...state,
          user: payload.currUser,
          status: payload.statuscode,
          loggedIn: true,
          token: payload.token,
        };
      case LOGOUT_USER:
        return { ...state, user: {}, loggedIn: false, token: "" };
      case RESET_USER:
        return { ...state, status: payload };
      case LOADING:
        return { ...state, isLoading: true };
      case NOT_LOADING:
        return { ...state, isLoading: false };
      case GET_TASK:
        return { ...state, Taskdata: payload };
      case GET_TASK:
        return { ...state, Taskdata: payload };
      case EDIT_TASK:
        return { ...state, Taskdata: payload };
      default:
        return state;
    }
  };
  