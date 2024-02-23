import * as THREE from 'three';
import { vis } from './init.js';
import { sphereArray } from './main.js'

/**
 * Simulation Parameters
 */

class gravityConstant {
  constructor(val=1) {
    this.value = val;
  }

  update(val) {
    this.value = val;
  }
};

class eletricConstant {
  constructor(val=1) {
    this.value = val;
  }

  update(val) {
    this.value = val;
  }
};

const gravity = new gravityConstant(.1);
const G = gravity.value;

const electric = new eletricConstant(1);
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
  }

  findForceOnObject() {
    const sumOfForces = new THREE.Vector3(0, 0, 0);

    sphereArray.forEach( (sphere) => {
      if (sphere.id === this.id) {return;}
      const forceDirection = sphere.position.clone().sub(this.position).normalize(); // force dir for gravity

      const gravMag = calculateGravitationalForce(this, sphere);
      const elecMag = calculateElectricalForce(this, sphere);

      forceDirection.multiplyScalar( (gravMag - elecMag) );

      sumOfForces.add(forceDirection);
    });

    return sumOfForces;
  }

  takeStep() {
    /**
     * Abstract the logic to as follows:
     * 1. calculate forces
     * 2. Use F=ma to find accelerate, aka new velo vector?
     * 3. Use new velo vector found somehow from above to move and update velo
     */
    const force = this.findForceOnObject();
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

export {physics}