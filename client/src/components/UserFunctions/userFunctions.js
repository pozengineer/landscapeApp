import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "../../actions/types";

var serverUrl = process.env.NODE_ENV || "http://localhost:5001";
// (change serverUrl on heroku)
if (process.env.NODE_ENV === "production") {
    serverUrl = 'https://pure-wave-73002.herokuapp.com/';
}
else {
    serverUrl = "http://localhost:5001";
}

// Register User
export const register = (userData, history) => dispatch => {
    console.log(userData);
    axios
    .post(serverUrl + "/api/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

// export const register = newUser => {
//     return axios
//     .post(serverUrl + '/api/register', {
//         first_name: newUser.first_name,
//         last_name: newUser.last_name,
//         email: newUser.email,
//         password: newUser.password
//     })
//     .then(res => {
//         console.log('Registered!');
//     })
// }

export const login = user => {
    return axios
    .post(serverUrl + '/api/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
