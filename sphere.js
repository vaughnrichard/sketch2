import * as THREE from 'three';
import { vis } from './init.js'
import { physics } from './physSim.js';

const waveAdjustfactor = (1 / 60 / Math.PI * 10) * 1/2;

class sphere extends physics {
  constructor(properties={}) {
//num_lines, pointsPerCircle, radius, position, color
    const position = properties['position'] || new THREE.Vector3(0, 0, 0); // position in world space
    const velocity = properties['velocity'] || new THREE.Vector3(0, 0, 0);
    const mass = properties['mass'] || 1;
    const charge = properties['charge'] || 1;

    const physParams = {
      position: position,
      velocity: velocity,
      mass: mass,
      charge: charge
    }

    super(physParams);

    this.pointsPerCircle = properties['pointsPerCircle'] || 10;
    this.num_lines = properties['num_lines'] || 5;
    this.radius = properties['radius'] || 1;
    this.color = properties['color'] || 0xff0000;

    this.id = properties['id'] || null;


    this.points = new Array();
    this.objectList = new Array();
    
    this.movement_step = 0;

    addSphere(this.num_lines, this.pointsPerCircle, this.radius, this.position, this.color, this);
  }

  vibrate() {
    const scaleFactor = Math.cos(this.movement_step++ * waveAdjustfactor) * .3 + 1;

    this.scalePointsToRadius(scaleFactor);
  }

  scalePointsToRadius(radius) {
    for (let i = 0; i < this.points.length; i++) {
      const newPos = this.points[i].clone().multiplyScalar(radius).add(this.position);
      this.objectList[i].position.copy( newPos );
    }
  }

  adjustRadiusByForces() {
    let otherRadius = 0;
    let minDist = Infinity;

    for (let i = 0; i < vis.objects.length; i++) {
      const currSphere = vis.objects[i];

      if (currSphere.id === this.id) { continue; }

      const currDist = this.position.clone().sub(currSphere.position).length();

      if (currDist < minDist) {
        minDist = currDist;
        otherRadius = currSphere.radius;
      }
    }


    if (minDist < otherRadius + this.radius) {
      const scaleFactor = minDist / (otherRadius + this.radius);

      this.scalePointsToRadius(scaleFactor);
    }

  }

  takeStep() {
    super.takeStep();
    this.moveToWorldPos(this.position);
    this.adjustRadiusByForces();
  }

  /**
   * Move the sphere 
   * @param {Vector3} worldPos new world position 
   */
  moveToWorldPos(worldPos) {
    // const positionShift = new THREE.Vector3().subVectors(worldPos, this.position);

    for (let i = 0; i < this.points.length; i++) {
      const newPos = this.points[i].clone().add(worldPos);
      this.objectList[i].position.copy(newPos);
    }
  }

  /**
   * Move a relative position in world space. I.e. 1 unit along x in world space.
   * @param {Vector3} relPos relative position to move in world space
   */
  moveRelativePos(relPos) {
    // console.log(relPos);
    for (let i = 0; i < this.points.length; i++) {
      // this.points[i].add(relPos);
      this.objectList[i].position.add(relPos);
    }

    this.position.add(relPos);
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
 * @param {THREE.Vector3} position 
 * @param {THREE.Vector3} planeVector
 */
function adjustCirclePoints(points, rotationArray) {

  const xAxis = new THREE.Vector3(1, 0, 0);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const zAxis = new THREE.Vector3(0, 0, 1);

  function transformPoints(point) {
    point.applyAxisAngle(xAxis, rotationArray[0]);
    point.applyAxisAngle(yAxis, rotationArray[1]);
    point.applyAxisAngle(zAxis, rotationArray[2]);

    // point.add(position);
  }

  points.map(transformPoints);
}

function createCircleFromPoints(numberOfPoints, radius, position, rotationArray, color, newSphere) {
  const points = generateCirclePoints(numberOfPoints, radius);

  adjustCirclePoints(points, rotationArray);

  const geometry = new THREE.SphereGeometry( .005, 32, 16 ); 
  const material = new THREE.MeshBasicMaterial( { color: color } );


  points.forEach( (point) => {
    const sphere = new THREE.Mesh( geometry, material );
    const pos = point.clone().add(position);
    // console.log(position)
    sphere.position.copy( pos );

    vis.scene.add(sphere);
    
    newSphere.points.push(point);
    newSphere.objectList.push(sphere);
  } );

}

function addCircletoScene(numberOfPoints, radius, position, rotationArray, color=0xffffff, newSphere) {
  createCircleFromPoints(numberOfPoints, radius, position, rotationArray, color, newSphere);
}

function addSphere(num_lines, pointsPerCircle, radius, position, color, newSphere) {
  // const newSphere = new sphere(position);

  for (let i = 0; i < num_lines; i++) {
    addCircletoScene(pointsPerCircle, radius, position, [(i * (Math.PI * 2 / num_lines)), Math.PI / 2, 0], color, newSphere);
    addCircletoScene(pointsPerCircle, radius, position, [0, (i * (Math.PI * 2 / num_lines)), 0], color, newSphere);
  }

  vis.objects.push(newSphere);
}

export { sphere }