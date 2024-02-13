import * as THREE from 'three';
import { vis } from './init.js'


function generateCirclePoints(numberOfPoints, radius) {
  const length = 2 * Math.PI;
  const stepSize = length / numberOfPoints;
  
  const points = [];
  for (let i = 0; i < numberOfPoints + 1; i++) { // must be number of points + 1 to connect end of the line to beginning
    const x = Math.cos(i * stepSize) * radius;
    const y = Math.sin(i * stepSize) * radius;
      points.push( new THREE.Vector3( x, y, 0 ) );    
  }

  return points;
}

/**
 * 
 * @param {Array<THREE.Vector3>} points 
 * @param {THREE.Vector3} origin 
 * @param {THREE.Vector3} planeVector
 */
function adjustCirclePoints(points, origin, rotationArray) {

  const xAxis = new THREE.Vector3(1, 0, 0);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const zAxis = new THREE.Vector3(0, 0, 1);

  function transformPoints(point) {
    point.applyAxisAngle(xAxis, rotationArray[0]);
    point.applyAxisAngle(yAxis, rotationArray[1]);
    point.applyAxisAngle(zAxis, rotationArray[2]);

    point.add(origin);
  }

  points.map(transformPoints);
}

function createCircleLine(numberOfPoints, radius, origin, rotationArray) {
  const points = generateCirclePoints(numberOfPoints, radius);

  adjustCirclePoints(points, origin, rotationArray);

  const geometry = new THREE.BufferGeometry().setFromPoints( points );

  const material = new THREE.LineBasicMaterial({
    color: 0xff0000
  });

  const line = new THREE.Line( geometry, material );
  return line;
}

function addCircletoScene(numberOfPoints, radius, origin, rotationArray) {
  const line = createCircleLine(numberOfPoints, radius, origin, rotationArray);

  vis.scene.add(line);
  vis.objects.push(line);
}

export { addCircletoScene }