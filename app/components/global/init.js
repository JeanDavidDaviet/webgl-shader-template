import animate from './animate';

const init = ({ stats, renderer }, setScene, setAnimate) => {
  document.body.appendChild( stats.dom );
  document.body.appendChild( renderer.domElement );
  setScene();

  animate(setAnimate);
}
export default init;
