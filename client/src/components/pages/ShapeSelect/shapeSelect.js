import React, { Component } from "react";
import "./style.css";
// import { Dropdown } from 'react-bootstrap';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import { Container } from '../../Grid';
// import GameLoop from './components/three.js';
// import { ThemeProvider } from '@zendeskgarden/react-theming';
// import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import * as THREE from "three";
import TwoD from '../../ThreeD/twoD';
// import { render } from "react-dom";
// import { Canvas } from "react-three-fiber";

class ShapeSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            planter_name: '',
            length: '',
            width: '',
            height: '',
            errors: {},
            geometry: '',
            materialArray: [],
            selectValue: '',
            material: [],
            volume: '',
            chosenMaterial: '',
            reqTonne: '',
            reqCost: '',
            email: '',
            _id: '',
            matches: window.matchMedia("(min-width: 922px)").matches
        }
    }
    squareGeometry = element => {
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
        this.geometry = new THREE.ExtrudeGeometry(triShape, extrudeSettings);
        return this.geometry;
    }

    triangleGeometry = element => {
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
        this.geometry = new THREE.ExtrudeGeometry(triShape, extrudeSettings);
        return this.geometry;
    }

    circleGeometry = element => {
        this.geometry = new THREE.CircleGeometry(2, 32);
        return this.geometry;
    }

    semiCircleGeometry = element => {
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
        this.geometry = new THREE.ExtrudeGeometry(shape, options);
        return this.geometry;
    }
    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 768px)").addListener(handler);
    }
    
    render() {
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
                    {this.state.matches && (<TwoD geometry={this.squareGeometry} cameraPos={75} />)}
                    {!this.state.matches && (<TwoD geometry={this.squareGeometry} cameraPos={100} />)}
                    {/* <TwoD geometry={this.squareGeometry} /> */}
                    <Button href="squareCalc">Square</Button>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className='threeCanvasDim'>
                    {this.state.matches && (<TwoD geometry={this.circleGeometry} cameraPos={75} />)}
                    {!this.state.matches && (<TwoD geometry={this.circleGeometry} cameraPos={100} />)}
                    {/* <TwoD geometry={this.circleGeometry} /> */}
                    <Button href="circleCalc">Circle</Button>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className='threeCanvasDim'>
                    {this.state.matches && (<TwoD geometry={this.semiCircleGeometry} cameraPos={75} />)}
                    {!this.state.matches && (<TwoD geometry={this.semiCircleGeometry} cameraPos={100} />)}
                    {/* <TwoD geometry={this.semiCircleGeometry} /> */}
                    <Button href="semiCircleCalc">Semi-Circle</Button>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className='threeCanvasDim'>
                    {this.state.matches && (<TwoD geometry={this.triangleGeometry} cameraPos={75} />)}
                    {!this.state.matches && (<TwoD geometry={this.triangleGeometry} cameraPos={100} />)}
                    {/* <TwoD geometry={this.triangleGeometry} /> */}
                    <Button href="triangleCalc">Triangle</Button>
                </Col>
            </Row>
        </Container>
    );
    }
}

export default ShapeSelect;