import * as THREE from 'three';
import renderer from './renderer';
// let OrbitControls = require("three-orbit-controls")(THREE);

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 12;

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize, false );
// const controls = new OrbitControls( camera, renderer.domElement );

export default camera;
