import React from "react";
// import "./style.css";
// import GameLoop from './components/three.js';
import * as THREE from "three";
import ThreeD from '../../ThreeD';
import { Container, Row, Col } from 'react-bootstrap';

function SquareCalc() {
    let geometry;
    
    const square = element => {
        geometry = new THREE.BoxGeometry(3, 3, 3);
        return geometry;
    }
    
    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <Row>
                        <Col sm={12} md={6}>
                            <ThreeD geometry={ square } />
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
}

export default SquareCalc;