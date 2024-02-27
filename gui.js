import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';
import { physParameters, simParameters } from './parameters.js';

const gui = new GUI();

function initGUI() {
  
  gui.add( physParameters, 'originGravity' ).name("Origin Gravity Constant");
  gui.add( physParameters, 'particleGravity' ).name("Particle Gravity Constant");
  gui.add( physParameters, 'electricConstant' ).name("Electric Force Constant");
  gui.add( physParameters, 'maxVelocityConstant' ).name("Max Velocity");
  gui.add( physParameters, 'airResistanceConstant' ).name('Air Resistance');
  gui.add( simParameters, 'paused').name('Paused');
}

export { initGUI }