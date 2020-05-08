import React, { Component } from "react";
import * as THREE from "three";
import ThreeDText from '../ThreeText/threeText';
import MediaQuery from 'react-responsive';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './style.css';

class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = { matches: window.matchMedia("(min-width: 992px)").matches };
    }

    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 768px)").addListener(handler);
    }

    render() {
        return (
            <div className="container">
                <Container>
                    <Row>
                        <div className='col-sm-12 mx-auto'>
                            {/* <h1 className='text-center'>WELCOME</h1> */}
                            {this.state.matches && (<ThreeDText size={30} />)}
                            {!this.state.matches && (<ThreeDText size={14} />)}
                        </div>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <h2>Welcome to LandScape!</h2>
                            <p>Venture into the three dimensional world of landscaping where you are able to visualize your created planter boxes.</p>
                            {localStorage.usertoken && <Link to='shapeSelect'> Let's Go Landscaping</Link>}
                            {!localStorage.usertoken && <p>Already have account
                            <Link to='login'> Click here</Link></p>}
                            {!localStorage.usertoken && <p>Create Account
                            <Link to='register'> Click here</Link></p>}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Landing;