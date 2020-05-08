import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        if (!token) { return };
        const decoded = jwt_decode(token);
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        })
    }

    render() {
        if (!localStorage.usertoken) {
            return (<Redirect to='/' />)
        }

        return (
            <Container fluid>
                <div className='jumbotron mt-5'>
                    <div className='col-sm-8 mx-auto'>
                        <h1 className='text-center'>PROFILE</h1>
                    </div>
                    <Row>
                        <Col size="md-12">
                            <article>
                                <h5>First Name</h5>
                                <p>
                                    {this.state.first_name}
                                </p>
                            </article>
                        </Col>
                        <Col size="md-12">
                            <div>
                                <h5>Last Name</h5>
                                <p>
                                    {this.state.last_name}
                                </p>
                            </div>
                        </Col>
                        <Col size="md-12">
                            <div>
                                <h5>Required Tonne</h5>
                                <p>
                                    {this.state.email}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Link to='shapeSelect'>Let's Go Landscaping</Link>
            </Container>
        )
    }
}

export default Profile;