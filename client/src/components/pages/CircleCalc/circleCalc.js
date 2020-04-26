import React from "react";
// import "./style.css";
// import GameLoop from './components/three.js';
import * as THREE from "three";
import ThreeD from '../../ThreeD/threeD';
import { Container, Row, Col } from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap';

function CircleCalc() {
    let geometry;
    const circle = element => {
        geometry = new THREE.CylinderGeometry(2, 2, 3, 20);
        return geometry;
    }

    // const handleInputChange = event => {
    //     let value = event.target;
    //     console.log(`Selected: ${value}`);
    //     if (value === 'pebble') {
    //         console.log('heavy hitter!');
    //     }
    //     else if (value === 'gardenMix') {
    //         console.log('planting!');
    //     }
    //     else {
    //         console.log('cement mixing!');
    //     }
    // };
    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <Row>
                        <Col sm={12} md={6}>
                            <ThreeD geometry={circle} />
                        </Col>
                        <Col sm={12} md={6}>
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
}

export default CircleCalc;