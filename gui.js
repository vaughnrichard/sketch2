import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';
import { physParameters, simParameters } from './parameters.js';

const gui = new GUI();

function initGUI() {
  
  gui.add( physParameters, 'originGravity' ).name("Origin Gravity").min(1e-4).max(10);
  gui.add( physParameters, 'particleGravity' ).name("Particle Gravity").min(1e-4).max(100);
  gui.add( physParameters, 'electricConstant' ).name("Electric Force").min(1e-4).max(100);
  // gui.add( physParameters, 'maxVelocityConstant' ).name("Max Velocity");
  gui.add( physParameters, 'airResistanceConstant' ).name('Air Resistance').min(1e-4).max(1000);
  gui.add( simParameters, 'paused').name('Paused');
}

export { initGUI }