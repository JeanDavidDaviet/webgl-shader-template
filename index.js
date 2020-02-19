import * as THREE from 'three';
import * as dat from 'dat.gui';
import Stats from 'stats.js';

import fox from './fox.jpg';
import displacement from './displacement.png';

import fragment from './fragment.glsl';
import vertex from './vertex.glsl';

let OrbitControls = require("three-orbit-controls")(THREE);

let camera;
let scene;
let renderer;
let plane;
let controls;
let material;
let paused = false;
let settings = {
  progress: 0
}

const stats = Stats();
stats.showPanel( 0 );

init();
animate();


document.body.addEventListener( 'keypress', function(e){
  if(e.code == "Space"){
    paused = !paused;
  }
}, false );

function init() {
  document.body.appendChild( stats.dom );

  const gui = new dat.GUI();
  gui.add(settings, 'progress', 0, 1, 0.01);

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 12;

  scene = new THREE.Scene();

  var texture = new THREE.TextureLoader().load( fox );

  var geometry = new THREE.PlaneGeometry( 10, 10, 1, 1 );
  material = new THREE.MeshBasicMaterial( { map: texture } );

  material = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension GL_OES_standard_deritatives : enable",
    },
    side: THREE.DoubleSide,
    uniforms: {
      time: { type: 'f', value: 0 },
      progress: { type: 'f', value: 0 },
      image: { type: 't', value: new THREE.TextureLoader().load(fox) },
      displacement: { type: 't', value: new THREE.TextureLoader().load(displacement) },
      resolution: { type: 'v4', value: new THREE.Vector4() },
      uvRate1: {
        value: new THREE.Vector2(1, 1)
      }
    },
    // wireframe: true,
    vertexShader: vertex,
    fragmentShader: fragment
  });

  plane = new THREE.Mesh( geometry, material );
  scene.add( plane );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xeeeeee, 1 );
  document.body.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
  controls = new OrbitControls( camera, renderer.domElement );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  if(paused){
    requestAnimationFrame( animate );
    return;
  }
  stats.begin();
  stats.end();
  material.uniforms.time.value += .05;
  material.uniforms.progress.value = settings.progress;
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
