import axios from "axios";
import {
  ADD_TASK,
  CHANGE_STATUS,
  EDIT_TASK,
  EDIT_USER,
  GET_TASK,
  GET_USER,
  LOGIN_USER,
  POST_USER,
  REMOVE_TASK,
  RESET_USER,
  STATUS_HANDLE,
} from "./actiontype";

export const getUser = (id) => async (dispatch) => {
  try {
    const user = await axios.get(
      `https://taskbackend-u0a1.onrender.com/user/${id}`
    );
    dispatch({
      type: GET_USER,
      payload: user.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`https://taskbackend-u0a1.onrender.com/user/addUser`, {
      ...user,
    });
    console.log(res.status);
    dispatch({
      type: POST_USER,
      payload: res.status,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: RESET_USER,
      payload: err.response.status,
    });
  }
};

// <------------ Login User ---------------------->
export const LoginUser = (user) => async (dispatch) => {
  console.log(user);
  try {
    const res = await axios.post(`https://taskbackend-u0a1.onrender.com/user/login`, {
      ...user,
    });
    console.log(res.data);
    console.log(res.data.token);

    // setCookie(res.data.user_present._id)

    localStorage.setItem("Token", res.data.token);
    dispatch({
      type: LOGIN_USER,
      payload: {
        currUser: res.data.user_present,
        statuscode: res.status,
        token: res.data.token,
      },
    });
  } catch (err) {
    dispatch({
      type: RESET_USER,
      payload: err.status,
    });
  }
};

// export const setCookie = (cvalue) => {
//   const d = new Date();
//   d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
//   let expires = "expires="+d.toUTCString();
//   document.cookie = "user=" + cvalue + ";" + expires + ";path=/";
// }

// export const getCookie = () => {
//   let name = "user=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for(let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

export const setUser = (_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://taskbackend-u0a1.onrender.com/user/${_id}`
    );
    console.log(res);
    dispatch({
      type: LOGIN_USER,
      payload: { currUser: res.data[0], statuscode: res.status },
    });
  } catch (err) {
    dispatch({
      type: RESET_USER,
      payload: err.response.status,
    });
  }
};

export const editUser = (user) => async (dispatch) => {
  try {
    await axios.patch(
      `https://taskbackend-u0a1.onrender.com/user/editUser/${user._id}`,
      {
        ...user,
      }
    );
    dispatch({
      type: EDIT_USER,
      payload: user,
    });
  } catch (err) {
    console.log(err);
  }
};

// Task Action Handling start from here ------------------>

export const Addtask = (task) => async (dispatch) => {
  try {
    console.log("Task to be added:", task);

    // Retrieve token from localStorage
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("Token:", token);

    // Make sure token is included in the request headers
    const objtoken = {
      config,
    };

    // Send POST request to create a new task
    const resp = await axios.post(
      `https://taskbackend-u0a1.onrender.com/task/createTask/`,
      task,
      config
    );

    console.log("Response:", resp.data);

    // Dispatch action to add the new task to the Redux store
    dispatch({
      type: ADD_TASK,
      payload: resp.data,
    });
  } catch (err) {
    // Handle errors
    console.error("Error:", err);
  }
};

export const getTaskData = (page,limit) => async (dispatch) => {
  const token = localStorage.getItem("Token");
  if(!token){
    return  
  }
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const gettask = await axios.get(
      `https://taskbackend-u0a1.onrender.com/task/getTask?page=${page}&limit=${limit}`,
      config
    );
    console.log(gettask.data.tasks);
    dispatch({
      type: GET_TASK,
      payload: gettask.data.tasks,
    });
  } catch (err) {
    console.log(err);
  }
};

export const RemoveTask = (_id) => async (dispatch) => {
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const resp = await axios.delete(
      `https://taskbackend-u0a1.onrender.com/task/deleteTask/${_id}`,
      config
    );
    dispatch({
      type: REMOVE_TASK,
      payload: _id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editTask = (taskId, updatedTaskData) => async (dispatch) => {
  console.log(updatedTaskData)
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    // Send PATCH request to update the task
    const response = await axios.patch(
      `https://taskbackend-u0a1.onrender.com/task/updatetask/${taskId}`,
      updatedTaskData,config
    );
   console.log(response.data)
    dispatch({
      type: EDIT_TASK,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error editing task:", error);
    // Handle error if necessary
  }
};

export const statuschange = (taskId, updatedTaskData) => async (dispatch) => {
  console.log(updatedTaskData)
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    // Send PATCH request to update the task
    const response = await axios.patch(
      `https://taskbackend-u0a1.onrender.com/task/updatetask/${taskId}`,
      updatedTaskData,config
    );
   console.log(response.data)
    dispatch({
      type: STATUS_HANDLE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error editing task:", error);
    // Handle error if necessary
  }
};

