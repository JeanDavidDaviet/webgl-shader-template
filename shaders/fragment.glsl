uniform float time;
uniform float progress;
uniform sampler2D image;
uniform sampler2D displacement;
uniform vec4 resolution;

varying vec2 vUv;
varying vec3 vPosition;

void main(){
  vec4 displace = texture2D( displacement, vUv.yx );
  vec2 displacedUv = vec2(
    vUv.x,
    vUv.y
  );

  displacedUv.y = mix(vUv.y, displace.r - 0.1, progress);

  vec4 color = texture2D( image, displacedUv );

  gl_FragColor = color;
}
