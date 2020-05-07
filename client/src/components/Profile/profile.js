import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
import { Link, Redirect } from "react-router-dom";

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        if(!token) {return};
        const decoded = jwt_decode(token);
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        })
    }

    render() {
        if(!localStorage.usertoken){
            return (<Redirect to='/' />)
        }

        return (
            <div className='container'>
                <div className='jumbotron mt-5'>
                    <div className='col-sm-8 mx-auto'>
                        <h1 className='text-center'>PROFILE</h1>       
                    </div>
                    <table className='table col-sm-12 col-md-6 mx-auto'>
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{ this.state.first_name }</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{ this.state.last_name }</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{ this.state.email }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link to='shapeSelect'>Let's Go Landscaping</Link>
            </div>
        )
    }
}

export default Profile;