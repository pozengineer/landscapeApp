import React, { Component } from "react";
import { loginUser, getUsers } from '../UserFunctions/userFunctions';
// const bcrypt = require('bcryptjs');
// import bcrypt from 'bcryptjs';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(event) {
        let errors = {};
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        getUsers().then(data => {
            // console.log(data);

            const validEmail = data.map(element => {
                if (element.email === this.state.email) {
                    // console.log('foundMatch');
                    // console.log(element.email);
                    return true;
                }
            }).filter(item => { return item; })[0];

            console.log(validEmail);
            
            if (validEmail) {
                loginUser(userData).then(res => {
                    if (res) {
                        this.props.history.push('/profile');
                        console.log("Login successful");
                    }
                    else {
                        errors["password"] = "Incorrect password";
                        this.setState({ errors: errors });
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
            else {
                console.log('Incorrect form');
                errors["email"] = "Email does not exist please register";
                this.setState({ errors: errors });
            }
        });
    }

    // onSubmit(e) {
    //     e.preventDefault();
    //     const user = {
    //         email: this.state.email,
    //         password: this.state.password
    //     }
    //     loginUser(user).then(res => {
    //         if (res) {
    //             this.props.history.push('/profile');
    //         }
    //         else {
    //             console.log("Incorrect email or password");
    //         }
    //     })
    // }

    render() {
        return (
            <div className='container' >
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className='h3 mb-3 font-weight normal'>Please Login</h1>
                            <div className='form-group'>
                                <label htmlFor='email'>Email Address</label>
                                <input type='email'
                                    refs='email'
                                    className='form-control'
                                    name='email'
                                    placeholder='Enter Email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input type='password'
                                    refs='password'
                                    className='form-control'
                                    name='password'
                                    placeholder='Enter Password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                            </div>
                            <button type='submit' className='btn btn-lg btn-primary btn-block'>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;