import * as THREE from 'three';
import material from './material';

const geometry = new THREE.PlaneGeometry( 10, 10, 1, 1 );

const plane = new THREE.Mesh( geometry, material );

export default plane;
