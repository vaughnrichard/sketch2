import * as THREE from 'three';
import { vis } from './init.js'

const waveAdjustfactor = (1 / 60 / Math.PI * 10) * 1/2;

class sphere {
  constructor(origin) {
    this.origin = origin; // origin in world space

    // this.circles = new Array();
    this.points = new Array();
    this.objectList = new Array();

    this.movement_step = 0;
  }

  vibrate() {
    const scaleFactor = Math.cos(this.movement_step++ * waveAdjustfactor) * .1 + 1;

    for (let i = 0; i < this.points.length; i++) {
      const newPos = this.points[i].clone().multiplyScalar(scaleFactor);
      this.objectList[i].position.copy( newPos );
    }
  }

  /**
   * Move the sphere 
   * @param {Vector3} worldPos new world position 
   */
  moveToWorldPos(worldPos) {
    const originShift = new THREE.Vector3().subVectors(worldPos, this.origin);

    this.moveRelativePos(originShift);
  }

  /**
   * Move a relative position in world space. I.e. 1 unit along x in world space.
   * @param {Vector3} relPos relative position to move in world space
   */
  moveRelativePos(relPos) {
    // console.log(relPos);
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].add(relPos);
      this.objectList[i].position.add(relPos);
    }

    this.origin.add(relPos);
  }
}

// class circle {
//   constructor(points, origin) {
//     this.points = points;
//     this.origin = origin;
//     this.objectList = new Array();
    
//     this.movement_step = 0;
//   }

//   vibratePoints() {
//     for (let i = 0; i < this.points.length; i++) {
//       const scaleFactor = Math.cos(this.movement_step++ * waveAdjustfactor) * .1 + 1;

//       const newPos = this.points[i].clone().multiplyScalar(scaleFactor);
//       this.objectList[i].position.copy( newPos );
//     }
//   }
// }

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

function createCircleFromPoints(numberOfPoints, radius, origin, rotationArray, color, newSphere) {
  const points = generateCirclePoints(numberOfPoints, radius);

  adjustCirclePoints(points, origin, rotationArray);

  const geometry = new THREE.SphereGeometry( .005, 32, 16 ); 
  const material = new THREE.MeshBasicMaterial( { color: 0xfffff } );

  // const circ = new circle(points, origin);

  points.forEach( (point) => {
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.copy( point );

    vis.scene.add(sphere);
    
    newSphere.points.push(point);
    newSphere.objectList.push(sphere);
    // circ.objectList.push(sphere);
  } );

  // newSphere.circles.push(circ);
}

function addCircletoScene(numberOfPoints, radius, origin, rotationArray, color=0xffffff, newSphere) {
  createCircleFromPoints(numberOfPoints, radius, origin, rotationArray, color, newSphere);
}

function addSphere(num_lines, pointsPerCircle, radius, origin, color) {
  const newSphere = new sphere(origin);

  for (let i = 0; i < num_lines; i++) {
    addCircletoScene(pointsPerCircle, radius, origin, [(i * (Math.PI * 2 / num_lines)), Math.PI / 2, 0], color, newSphere);
    addCircletoScene(pointsPerCircle, radius, origin, [0, (i * (Math.PI * 2 / num_lines)), 0], color, newSphere);
  }

  vis.objects.push(newSphere);
}

export { addSphere }