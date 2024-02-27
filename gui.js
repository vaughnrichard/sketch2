import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';
import { physParameters, simParameters } from './parameters.js';

const gui = new GUI();

function initGUI() {
  
  gui.add( physParameters, 'originGravity' );  // Checkbox
  gui.add( physParameters, 'particleGravity' ); // Button
  gui.add( physParameters, 'electricConstant' );   // Text Field
  gui.add( physParameters, 'maxVelocityConstant' );   // Number Field
  gui.add( physParameters, 'airResistanceConstant' );   // Number Field
  gui.add( simParameters, 'paused');
}

export { initGUI }