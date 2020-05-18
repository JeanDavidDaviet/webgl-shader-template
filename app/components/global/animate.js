import renderer from './renderer';
import camera from './camera';
import scene from '../scene/scene';
import stats from './stats';
import controls from './controls';

const animate = (setAnimate) => {
  requestAnimationFrame( () => animate(setAnimate) );
  stats.begin();
  stats.end();

  setAnimate();
  
	controls.update();
  renderer.render( scene, camera );
}

export default animate;
