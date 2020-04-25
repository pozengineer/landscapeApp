import axios from 'axios';

var serverUrl =  "http://localhost:5001";
// (change serverUrl on heroku)
// if (process.env.NODE_ENV === "production") {
//     serverUrl = 'https://pure-wave-73002.herokuapp.com/';
// } 

export const register = newUser => {
    return axios
    .post(serverUrl + '/api/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log('Registered!');
    })
}

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