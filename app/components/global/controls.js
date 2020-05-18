import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';
import renderer from './renderer';
import camera from './camera';

let OrbitControlsInstance = OrbitControls(THREE);
const controls = new OrbitControlsInstance( camera, renderer.domElement );

export default controls;
