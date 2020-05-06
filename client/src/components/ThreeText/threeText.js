import React, { Component } from "react";
import './style.css';
// import { Container, Row, Col } from 'react-bootstrap';
import * as THREE from "three";
import WEBGL from '../WEBGL/webGL';
import Helevetiker from './helvetiker_regular.typeface'

class ThreeDText extends Component {
    constructor(props) {
        super(props);
        // this.geometry = props.geometry();
        this.size = props.size
        // console.log(this.geometry);
    }

    componentDidMount() {
        if (WEBGL.isWebGLAvailable()) {
            var scene = new THREE.Scene();
            // const canvas = document.querySelector('.c');
            var camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
            var renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight, false);
            // document.body.appendChild( renderer.domElement );
            // use ref as a mount point of the Three.js scene instead of the document.body
            this.mount.appendChild(renderer.domElement);

            // var loader = new THREE.FontLoader();

            // loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
                let loader = new THREE.FontLoader();
                let fontJSON = Helevetiker;
                let font = loader.parse(fontJSON);
                var geometry = new THREE.TextBufferGeometry('LandScape', {
                    font: font,
                    size: this.size,
                    height: 5,
                    curveSegments: 12,
                    bevelEnabled: false,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelOffset: 0,
                    bevelSegments: 5
                });
                var material = new THREE.MeshPhongMaterial(
                    {
                        color: 0xff0000,
                        specular: 0xffffff
                    }
                );
    
                var textMaterial = new THREE.MeshBasicMaterial(
                    {
                        // color: 0x212121,
                        color: 0xffffff,
                        // color: 0x00ff00,
                        wireframe: true
                    });
                var threeDimObject = new THREE.Mesh(geometry, textMaterial);
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
                camera.position.z = 100;
                var animate = function (time) {
                    window.addEventListener('resize', onWindowResize, false);
                    time *= 0.001;
                    requestAnimationFrame(animate);
                    // resizeCanvasToDisplaySize();
                    threeDimObject.rotation.x += 0.02;
                    threeDimObject.rotation.y += 0.00;
                    threeDimObject.rotation.z += 0.00;
                    renderer.render(scene, camera);
                };
                animate();
            // });   
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

export default ThreeDText;
