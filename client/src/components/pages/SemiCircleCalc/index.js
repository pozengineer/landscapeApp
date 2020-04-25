import React from "react";
// import "./style.css";
// import GameLoop from './components/three.js';
import * as THREE from "three";
import ThreeD from '../../ThreeD';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';

function SemiCircleCalc() {
    let geometry;
    const torusKnot = element => {
        geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 8);
        return geometry;
    }
    
    const handleInputChange = value => {
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
        <div className="App">
            <header className="App-header">
                <Container>
                    <Row>
                        <Col sm={12} md={6}>
                            <ThreeD geometry={torusKnot} />
                        </Col>
                        <Col sm={12} md={6}>
                            <ThemeProvider>
                                <Dropdown onSelect={ handleInputChange }>
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
            </header>
        </div >
    );
}

export default SemiCircleCalc;