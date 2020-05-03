import React from "react";
// import "./style.css";
// import GameLoop from './components/three.js';
import * as THREE from "three";
import ThreeD from '../../ThreeD/threeD';
import { Container, Row, Col } from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';

function CircleCalc() {
    let geometry;
    const circle = element => {
        geometry = new THREE.CylinderGeometry(2, 2, 3, 20);
        return geometry;
    }

    const handleInputChange = event => {
        let value = event.target;
        console.log(`Selected: ${value}`);
        if (value === 'pebble') {
            console.log('heavy hitter!');
        }
        else if (value === 'gardenMix') {
            console.log('planting!');
        }
        else {
            console.log('cement mixing!');
        }
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h2>Dimensions of Planter Box</h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={{ span: 8, offset: 2 }}>
                        <ThreeD geometry={circle} />
                    </Col>
                    <Col sm={12} md={6}>
                        <ThemeProvider>
                            <Dropdown onSelect={handleInputChange}>
                                <Trigger>
                                    <button>Select Material</button>
                                </Trigger>
                                <Menu placement="end" arrow>
                                    <Item value="yellowSand">Yellow Brickie Sand</Item>
                                    <Item value="gardenMix">Garden Mix</Item>
                                    <Item value="pebble">Pebble</Item>
                                </Menu>
                            </Dropdown>
                        </ThemeProvider>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CircleCalc;