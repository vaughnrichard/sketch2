import * as THREE from 'three';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';
import { physParameters, simParameters } from './parameters.js';
import { vis } from './init.js';
import { sphere } from './sphere.js';

const gui = new GUI();

function initGUI() {
  
  gui.add( physParameters, 'originGravity' ).name("Origin Gravity").min(1e-4).max(10);
  gui.add( physParameters, 'particleGravity' ).name("Particle Gravity").min(1e-4).max(100);
  gui.add( physParameters, 'electricConstant' ).name("Electric Force").min(1e-4).max(100);
  // gui.add( physParameters, 'maxVelocityConstant' ).name("Max Velocity");
  gui.add( physParameters, 'airResistanceConstant' ).name('Air Resistance').min(1e-4).max(1000);
  gui.add( simParameters, 'paused').name('Paused');


  const particleFolder = gui.addFolder('Add Particle');

  const positionSubFolder = particleFolder.addFolder('Position');
  positionSubFolder.add( simParameters, 'x').name('x');
  positionSubFolder.add( simParameters, 'y').name('y');
  positionSubFolder.add( simParameters, 'z').name('z');
  positionSubFolder.close();

  const velocitySubFolder = particleFolder.addFolder('Velocity');
  velocitySubFolder.add( simParameters, 'vx').name('∆x');
  velocitySubFolder.add( simParameters, 'vy').name('∆y');
  velocitySubFolder.add( simParameters, 'vz').name('∆z');
  velocitySubFolder.close();

  particleFolder.add( simParameters, 'radius').name('Radius');
  particleFolder.addColor( simParameters, 'color').name('Color');

  particleFolder.add( simParameters, 'mass').name('Mass');
  particleFolder.add( simParameters, 'charge').name('Charge');

  particleFolder.add( simParameters, 'addPart').name('Add Particle');

  // function addParticle() {
  //   new sphere();
  // }

}

export { initGUI }