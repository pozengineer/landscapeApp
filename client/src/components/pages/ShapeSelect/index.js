import React from "react";
import "./style.css";
import { Dropdown } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
// import GameLoop from './components/three.js';
// import { ThemeProvider } from '@zendeskgarden/react-theming';
// import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import * as THREE from "three";
import ThreeD from '../../ThreeD';
import { Canvas } from "react-three-fiber";

function ShapeSelect() {
    let shapeSelect;
    let geometry;

    const circleGeometry = element => {
        geometry = new THREE.CircleGeometry(3, 32);
        return geometry;
    }

    const semiCircleGeometry = element => {
        // path to extrude along
        var path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 10, 10),
            new THREE.Vector3(20, 10, 20)
        ]);

        // points that define shape
        var pts = [];
        var numPoints = 25;
        var radius = 3;

        for (var i = 0; i < numPoints; i++) {

            var a = Math.PI * i / numPoints;
            pts.push(new THREE.Vector2(Math.cos(a) * radius, Math.sin(a) * radius));

        }

        // shape to extrude
        var shape = new THREE.Shape(pts);

        // extrude options
        var options = {
            amount: 0,              // default 100, only used when path is null
            bevelEnabled: false,
            bevelSegments: 0,
            steps: 3,                // default 1, try 3 if path defined
            extrudePath: null       // or path
        };
        geometry = new THREE.ExtrudeGeometry(shape, options);
        return geometry;
    }

    const handleInputChange = value => {
        console.log(`Selected: ${value}`);
        if (value === 'square') {
            console.log('heavy hitter!');
            shapeSelect = new THREE.BoxGeometry(3, 3, 3);
        }
        else if (value === 'circle') {
            console.log('planting!');
            shapeSelect = new THREE.CylinderGeometry(2, 2, 3, 20);
        }
        else {
            console.log('cement mixing!');
            shapeSelect = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 8);
        }
    }
    return (
        <div className='App'>
            <header className='App-header'>
                <Container>
                    <Row>
                        <Col sm={12} md={12}>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Select Shape
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="squareCalc">Square</Dropdown.Item>
                                    <Dropdown.Item href="circleCalc">Circle</Dropdown.Item>
                                    <Dropdown.Item href="semi-CircleCalc">Semi-Circle</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        {/* <Col sm={12} md={12}>
                            <ThemeProvider>
                                <Dropdown onSelect={handleInputChange}>
                                    <Trigger>
                                        <button>Select Shape</button>
                                    </Trigger>
                                    <Menu placement="end" arrow>
                                        <Item value="square">Square</Item>
                                        <Item value="circle">Circle</Item>
                                        <Item value="semi-circle">Semi-Circle</Item>
                                    </Menu>
                                </Dropdown>
                            </ThemeProvider>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <ThreeD geometry={circleGeometry} className='threeCanvasDim' />
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                            <ThreeD geometry={semiCircleGeometry} />
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    );
}

export default ShapeSelect;