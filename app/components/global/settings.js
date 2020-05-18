import * as dat from 'dat.gui';

const settings = {
  progress: 0
}

const gui = new dat.GUI();
gui.add(settings, 'progress', 0, 1, 0.01);

export default settings;
