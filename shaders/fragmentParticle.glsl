uniform float time;

void main(){
  float dist = length(gl_PointCoord - vec2(.5));
  float alpha = 1. - smoothstep(0.4, .45, dist);
  gl_FragColor = vec4(1., 1., 1., alpha);
}
