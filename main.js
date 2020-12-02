import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import fox from './imgs/fox.jpg';
import displacement from './imgs/displacement.png';

import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';

import * as dat from 'dat.gui';
import Stats from 'stats.js';

class Sketch {
  constructor(options){
    this.scene = new THREE.Scene();
    this.container = options.dom;
    this.width = this.container.width;
    this.height = this.container.height;
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.width, this.height );
    this.renderer.setClearColor( 0xeeeeee, 1 );
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild( this.renderer.domElement );

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.001, 1000 );
    this.camera.position.set(0, 0, 20);

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.time = 0;
    this.isPlaying = true;

    this.container.addEventListener( 'keypress', function(e){
      if(e.code == "Space"){
        this.stop();
      }
    }, false );

    this.addObjects();
    this.resize();
    this.play();
    this.setupResize();
    this.settings();
    this.setupStats();
  }

  settings(){
    let that = this;
    this.settings = {
      progress: 0
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, 'progress', 0, 1, 0.01);
  }

  setupStats(){
    this.stats = Stats();
    this.stats.showPanel( 0 );

    this.container.appendChild( this.stats.dom );
  }

  setupResize(){
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize(){
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    // image cover
    this.imageAspect = 853/1280;
    let a1; let a2;
    if(this.height / this.width > this.imageAspect){
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    }else{
      a1 = 1;
      a2 = (this.height / this.width) / this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    this.camera.updateProjectionMatrix();
  }

  addObjects(){
    let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_deritatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: 'f', value: 0 },
        resolution: { type: 'v4', value: new THREE.Vector4() },
        progress: { type: 'f', value: 0 },
        image: { type: 't', value: new THREE.TextureLoader().load(fox) },
        displacement: { type: 't', value: new THREE.TextureLoader().load(displacement) },
      },
      // wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment
    });

    this.geometry = new THREE.PlaneGeometry( 10, 10, 1, 1 );

    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.plane );
  }

  stop(){
    this.isPlaying = false;
  }

  play(){
    if(!this.isPlaying){
      requestAnimationFrame( this.play.bind(this) );
      return;
    }
    if(this.stats){
      this.stats.begin();
      this.stats.end();
    }
    this.material.uniforms.time.value += .05;
    this.material.uniforms.progress.value = this.settings.progress;
    requestAnimationFrame( this.play.bind(this) );
    this.renderer.render( this.scene, this.camera );
  }
}

new Sketch({
  dom: document.querySelector('#container')
});
