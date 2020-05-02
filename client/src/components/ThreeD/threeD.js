import React, { Component } from "react";
import './style.css';
// import { Container, Row, Col } from 'react-bootstrap';
import * as THREE from "three";
import WEBGL from '../WEBGL/webGL';

class ThreeD extends Component {
    constructor(props) {
        super(props);
        this.geometry = props.geometry();
        // console.log(this.geometry);
    }

    componentDidMount() {
        if (WEBGL.isWebGLAvailable()) {
            var scene = new THREE.Scene();
            // const canvas = document.querySelector('.c');
            var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
            var renderer = new THREE.WebGLRenderer({ alpha: true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight, false);
            // document.body.appendChild( renderer.domElement );
            // use ref as a mount point of the Three.js scene instead of the document.body
            this.mount.appendChild(renderer.domElement);

            var length = 5, width = 3;

            var triShape = new THREE.Shape();
            triShape.moveTo(0, 0);
            triShape.lineTo(length / 2, width);
            triShape.lineTo(length, 0);
            // triShape.lineTo(length, 0);
            triShape.lineTo(0, 0);

            // var extrudeSettings = {
            //     steps: 2,
            //     depth: 4,
            //     bevelEnabled: false,
            //     bevelThickness: 1,
            //     bevelSize: 1,
            //     bevelOffset: 0,
            //     bevelSegments: 1
            // };
            // geometry

            // var geometry = new THREE.ExtrudeGeometry(shape, options);
            // var geometry = new THREE.ExtrudeGeometry(triShape, extrudeSettings);
            // var geometry = new THREE.CylinderGeometry(2, 2, 3, 20);
            // var geometry = new THREE.BoxGeometry(3, 3, 3);
            // var geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 8)
            // var material = new THREE.MeshBasicMaterial(
            var geometry = this.geometry;
            var material = new THREE.MeshBasicMaterial(
                {
                    color: 0xffffff,
                    // color: 0x00ff00,
                    wireframe: true
                });
            var threeDimObject = new THREE.Mesh(geometry, material);
            geometry.center();
            scene.add(threeDimObject);
            
            function onWindowResize(event) {
                event.preventDefault();
                var width = window.innerWidth;
                var height = window.innerHeight;
                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }

            // axes
            // scene.add(new THREE.AxisHelper());
            camera.position.z = 5;
            var animate = function (time) {
                window.addEventListener('resize', onWindowResize, false);
                time *= 0.001;
                requestAnimationFrame(animate);
                // resizeCanvasToDisplaySize();
                threeDimObject.rotation.x += 0.00;
                threeDimObject.rotation.y += 0.02;
                renderer.render(scene, camera);
            };
            animate();
        }
        else {
            var warning = WEBGL.getWebGLErrorMessage();
            // document.getElementById('container').appendChild(warning);
            this.mount.appendChild(warning);
        }
    }
    componentWillUnmount() {
        // window.addEventListener('resize', this.onWindowResize, false);
    }
    render() {
        return (
            <div className='canvas' ref={ref => (this.mount = ref)} />
        )
    }
}

export default ThreeD;
