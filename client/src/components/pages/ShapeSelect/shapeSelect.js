import React from "react";
import "./style.css";
// import { Dropdown } from 'react-bootstrap';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import { Container } from '../../Grid';
// import GameLoop from './components/three.js';
// import { ThemeProvider } from '@zendeskgarden/react-theming';
// import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import * as THREE from "three";
import TwoD from '../../ThreeD/twoD';
// import { Canvas } from "react-three-fiber";

function ShapeSelect() {
    let geometry;

    const squareGeometry = element => {

        let length = 3;
        let width = 3;

        const triShape = new THREE.Shape();
        triShape.moveTo(0, 0);
        triShape.lineTo(0, width);
        triShape.lineTo(width, length);
        triShape.lineTo(length, 0);
        triShape.lineTo(0, 0);

        let extrudeSettings = {
            steps: 2,
            depth: 0,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        geometry = new THREE.ExtrudeGeometry(triShape, extrudeSettings);
        return geometry;
    }

    const triangleGeometry = element => {
        let length = 5;
        let width = 3;

            var triShape = new THREE.Shape();
            triShape.moveTo(0, 0);
            triShape.lineTo(length / 2, width);
            triShape.lineTo(length, 0);
            // triShape.lineTo(length, 0);
            triShape.lineTo(0, 0);

        let extrudeSettings = {
            steps: 2,
            depth: 0,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
        };
        geometry = new THREE.ExtrudeGeometry(triShape, extrudeSettings);
        return geometry;
    }

    const circleGeometry = element => {
        geometry = new THREE.CircleGeometry(2, 32);
        return geometry;
    }

    const semiCircleGeometry = element => {
        // path to extrude along
        // var path = new THREE.CatmullRomCurve3([
        //     new THREE.Vector3(0, 0, 0),
        //     new THREE.Vector3(10, 10, 10),
        //     new THREE.Vector3(20, 10, 20)
        // ]);

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

    if(!localStorage.usertoken) {
        return (<p>Not Authorized</p>)
    }
    
    return (
        <Container className='container'>
            <Row>
                <Col sm={12} md={12}>
                    <h2>Select Shape of Planter Box</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={6} md={6} lg={6} className='threeCanvasDim'>
                    <TwoD geometry={squareGeometry} />
                    <Button href="squareCalc">Square</Button>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className='threeCanvasDim'>
                    <TwoD geometry={circleGeometry} />
                    <Button href="circleCalc">Circle</Button>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className='threeCanvasDim'>
                    <TwoD geometry={semiCircleGeometry} />
                    <Button href="semiCircleCalc">Semi-Circle</Button>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className='threeCanvasDim'>
                    <TwoD geometry={triangleGeometry} />
                    <Button href="triangleCalc">Triangle</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ShapeSelect;