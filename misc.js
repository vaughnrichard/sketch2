/**
 * Misc testing
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/+esm'
import { vis } from './init.js'

function generateCirclePoints(numberOfPoints, radius, orientation) {
  const length = 2 * Math.PI;
  const stepSize = length / numberOfPoints;
  
  const points = [];
  for (let i = 0; i < numberOfPoints + 1; i++) { // must be number of points + 1 to connect end of the line to beginning
    const x = Math.cos(i * stepSize) * radius;
    const z = Math.sin(i * stepSize) * radius;
    if (orientation === 'yz') {
      points.push( new THREE.Vector3( 0, x, z ) );
    } else {
      points.push( new THREE.Vector3( x, 0, z ) );
    }
    
  }

  return points;
}

function createCircleLine(numberOfPoints, radius, orientation) {
  const points = generateCirclePoints(numberOfPoints, radius, orientation);

  const geometry = new THREE.BufferGeometry().setFromPoints( points );

  const material = new THREE.LineBasicMaterial({
    color: 0xff0000
  });

  const line = new THREE.Line( geometry, material );
  return line;
}

function addCircletoScene(numberOfPoints, radius, orientation) {
  const line = createCircleLine(numberOfPoints, radius, orientation);

  vis.scene.add(line);
  console.log(orientation)
}

export { addCircletoScene }