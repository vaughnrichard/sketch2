import * as THREE from 'three';
import { vis } from './init.js';
import { sphereArray } from './main.js'

/**
 * Simulation Parameters
 */

class constant {
  constructor(val=1) {
    this.value = val;
  }

  update(val) {
    this.value = val;
  }
};

const originGravity = new constant(1e-6);
const originG = originGravity.value;

const particleGravity = new constant(.2);
const G = particleGravity.value;

const electric = new constant(1);
const C = electric.value;

const stepSize = 1/10;

/**
 * End Parameters
 */


class physics {
  constructor(physParams={}) {
    this.position = physParams['position'] || new THREE.Vector3(0, 0, 0);
    this.velocity = physParams['velocity'] || new THREE.Vector3(0, 0, 0);
    this.mass = physParams['mass'] || 1;
    this.charge = physParams['charge'] || 1;

    this.radiusAfterForce = 1;
  }

  adjustRadiusOnDistanceToNearestNeighbor(obj1, obj2) {
    const distanceMag = sphere.position.clone().sub(this.position).length();

    const rad1 = obj1.radius;
    const rad2 = obj2.radius;

    const radAlpha = (rad1 + rad2) / distanceMag;

    if (radAlpha >= 1) {return;}

    
  }

  findForceOnObjectAndMinDist() {
    const sumOfForces = new THREE.Vector3(0, 0, 0);
    let minDistObj;
    let minDist = Infinity;

    sphereArray.forEach( (sphere) => {
      if (sphere.id === this.id) {return;}
      const forceDirection = sphere.position.clone().sub(this.position); // force dir for particleGravity

      const curLen = forceDirection.length();
      if ( curLen < minDist) {
        minDistObj = sphere;
        minDist = curLen;
      }

      // normalization is done after so that the distance may be calculated
      forceDirection.normalize();

      const gravMag = calculateGravitationalForce(this, sphere);
      const elecMag = calculateElectricalForce(this, sphere);

      forceDirection.multiplyScalar( (gravMag - elecMag) );

      sumOfForces.add(forceDirection);
    });

    // add in origin gravity force
    const originGravityScale = calculateOriginGravitationalForce(this);
    const originGravityForce = this.position.clone().normalize().negate().multiplyScalar(originGravityScale);

    sumOfForces.add(originGravityForce);

    return [sumOfForces, minDistObj];
  }

  takeStep() {
    /**
     * Abstract the logic to as follows:
     * 1. calculate forces, finding minimum distance while at it
     * 2. Use F=ma to find accelerate, aka new velo vector?
     * 3. Use new velo vector found somehow from above to move and update velo
     */
    const [force, minDist] = this.findForceOnObjectAndMinDist();
    const acceleration = force.multiplyScalar(1 / this.mass);
    // console.log(acceleration);

    const deltaV = acceleration.multiplyScalar(stepSize);
    // deltaPosition.add(this.velocity);
    this.velocity.add(deltaV);
    // console.log(deltaPosition);
    this.position.add(this.velocity);
    // this.velocity.copy(deltaPosition.multiplyScalar(1/stepSize));


  }
}

function calculateGravitationalForce(obj1, obj2) {
  const pos1 = obj1.position; const pos2 = obj2.position;
  const distanceBetweenPoints = new THREE.Vector3().subVectors(pos1,pos2).length();

  // console.log(distanceBetweenPoints);

  const gravitationalForce = G * ( (obj1.mass * obj2.mass) / ( distanceBetweenPoints * distanceBetweenPoints ) );
  return gravitationalForce;
}

function calculateElectricalForce(obj1, obj2) {
  const pos1 = obj1.position; const pos2 = obj2.position;
  const distanceBetweenPoints = new THREE.Vector3().subVectors(pos1,pos2).length();

  const electricalForce = C * ( (obj1.charge * obj2.charge) / ( distanceBetweenPoints * distanceBetweenPoints * distanceBetweenPoints * distanceBetweenPoints) );
  return electricalForce;
}

function calculateOriginGravitationalForce(obj) {
  const dist = obj.position.length();
  const gravitationalForce = originG * ( dist * dist );

  return gravitationalForce;
}

export {physics}