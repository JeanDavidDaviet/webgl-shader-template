import * as THREE from 'three';

import fox from '/imgs/fox.jpg';
import displacement from '/imgs/displacement.png';

import fragment from '/shaders/fragment.glsl';
import vertex from '/shaders/vertex.glsl';

const material = new THREE.ShaderMaterial({
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

export default material;
