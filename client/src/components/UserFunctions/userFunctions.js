import axios from 'axios';

// let serverUrl = "http://localhost:5001"
// (change serverUrl on heroku)
// if (process.env.NODE_ENV === "production") {
//     serverUrl = 'https://pure-wave-73002.herokuapp.com/';
// }

export const registerUser = userData => {
    // console.log(userData);
    return axios
    .post('/api/register', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password
    })
    .then(res => {
        console.log('Registered!');
    })
}

export const loginUser = userData => {
    // console.log(userData);
    return axios
    .post('/api/login', {
        email: userData.email,
        password: userData.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export const getUsers = userData => {
    return axios
    .get('/api/displayusers', {
    })
    .then(response => {
        // console.log(response.data);
        // console.log(userData);  
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}

export const getMaterials = materialData => {
    return axios
    .get('/api/displaymaterials', {
    })
    .then(response => {
        // console.log(response.data);
        // console.log(userData);  
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}