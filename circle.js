import * as THREE from 'three';
import { vis } from './init.js'

class circle {
  constructor(points, origin) {
    this.points = points;
    this.origin = origin;
    this.objectList = new Array();
  }

  movePoints() {
    // this.objectList.forEach( (object) => {
    //   const scaleFactor = Math.random() * .1 + 0.95;

    //   object.position.multiplyS
    // });

    for (let i = 0; i < this.points.length; i++) {
      const scaleFactor = Math.random() * .4 + 0.80;

      const newPos = this.points[i].clone().multiplyScalar(scaleFactor);
      console.log(newPos);
      this.objectList[i].position.copy( newPos );
      // console.log
    }
  }
}

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

function createCircleLine(numberOfPoints, radius, origin, rotationArray, color) {
  const points = generateCirclePoints(numberOfPoints, radius);

  adjustCirclePoints(points, origin, rotationArray);

  const geometry = new THREE.SphereGeometry( .005, 32, 16 ); 
  const material = new THREE.MeshBasicMaterial( { color: 0xfffff } );

  const circ = new circle(points, origin);

  points.forEach( (point) => {
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.copy( point );

    // console.log(sphere);
    vis.scene.add(sphere);
    circ.objectList.push(sphere);
  } );

  vis.objects.push(circ);

  // const geometry = new THREE.BufferGeometry().setFromPoints( points );

  // const material = new THREE.LineBasicMaterial({
  //   color: color
  // });

  // const line = new THREE.Line( geometry, material );
  // return line;

  return []
}

function addCircletoScene(numberOfPoints, radius, origin, rotationArray, color=0xffffff) {
  const line = createCircleLine(numberOfPoints, radius, origin, rotationArray, color);

  // vis.scene.add(line);
  // vis.objects.push(line);
}

export { addCircletoScene }