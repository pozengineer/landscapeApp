import React from 'react';
var THREE = require('three');
// var cubeScene = document.getElementById('cube');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
var cubeScene = document.getElementById('cube');
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(cubeScene);
console.log(renderer);
document.body.appendChild(renderer.domElement);

// create the shape
var geometry = new THREE.BoxGeometry(1,1,1);

// create a material, colour, or image texture
var material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true,
});
var cube = new THREE.Mesh(geometry,material);
scene.add(cube);
camera.position.z = 3;

// game logic
var update = function () {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
};
// draw scene
var render = function () {
    renderer.render(scene, camera);
};
// run gameloop (update,render,repeat)
function GameLoop() {
    requestAnimationFrame(GameLoop);
    update();
    render();
    return (
        < div id='cube'>
        </div>
    )
};

export default GameLoop;
