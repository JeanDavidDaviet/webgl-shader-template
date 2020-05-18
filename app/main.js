import material from './components/scene/plane/material';
import plane from './components/scene/plane/plane';
import scene from './components/scene/scene';
import renderer from './components/global/renderer';
import stats from './components/global/stats';
import settings from './components/global/settings';
import init from './components/global/init';

const setScene = () => {
  scene.add( plane );
}

const setAnimate = () => {
  material.uniforms.time.value += .05;
  material.uniforms.progress.value = settings.progress;
}

init({stats, renderer}, setScene, setAnimate);
