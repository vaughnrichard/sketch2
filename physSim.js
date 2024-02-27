import * as THREE from 'three';
import { vis } from './init.js';
import { physParameters } from './parameters.js';

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

const gravity_damp_factor = 1e-3;
const electric_damp_factor = 1/2;

const originGravity = new constant(1e-4);
const originG = originGravity.value;

const particleGravity = new constant(.1);
const G = particleGravity.value;

const electric = new constant(.3);
const C = electric.value;

const maxVelocityConstant = new constant(0.1);
const maxVelocity = maxVelocityConstant.value;

const airResistanceConstant = new constant(1e20);
const airResistance = airResistanceConstant.value;

const stepSize = 1/60;

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

  calculateAirResistance() {
    // const veloDir = this.velocity.clone().normalize().negate();
    let veloMag = this.velocity.length() * physParameters['airResistanceConstant'];

    if (veloMag === 0) {
      return 0;
    }

    else if (veloMag < 1 ) {
      veloMag === 1;
    }
 
    const returnVal = (veloMag * veloMag) || 0;



    return returnVal;
  }

  clampVelo() {
    if (this.velocity.length() > physParameters['maxVelocityConstant']) {
      this.velocity.multiplyScalar( physParameters['maxVelocityConstant'] / this.velocity.length() );
    }

    // console.log(this.velocity.length());
  }

  findForceOnObjectAndMinDist() {
    const sumOfForces = new THREE.Vector3(0, 0, 0);
    let minDistObj;
    let minDist = Infinity;

    vis.objects.forEach( (sphere) => {
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

    // add in air resistance
    const airResistanceScale = this.calculateAirResistance();
    const airResistanceForce = this.velocity.clone().normalize().multiplyScalar(-airResistanceScale);

    if (airResistanceScale > this.velocity.length()) {
      airResistanceForce.multiplyScalar( this.velocity.length() / airResistanceScale );
    }
    // console.log(airResistanceScale);

    sumOfForces.add(originGravityForce);
    sumOfForces.add(airResistanceForce);

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

    // this.clampVelo();
    // console.log(deltaPosition);
    this.position.add(this.velocity);
    // this.velocity.copy(deltaPosition.multiplyScalar(1/stepSize));


  }
}

function calculateGravitationalForce(obj1, obj2) {
  const pos1 = obj1.position; const pos2 = obj2.position;
  const distanceBetweenPoints = new THREE.Vector3().subVectors(pos1,pos2).length();

  // console.log(distanceBetweenPoints);

  const gravitationalForce = gravity_damp_factor * physParameters['particleGravity'] * ( (obj1.mass * obj2.mass) / ( distanceBetweenPoints * distanceBetweenPoints ) );
  return gravitationalForce;
}

function calculateElectricalForce(obj1, obj2) {
  const pos1 = obj1.position; const pos2 = obj2.position;
  const distanceBetweenPoints = new THREE.Vector3().subVectors(pos1,pos2).length();

  const electricalForce = electric_damp_factor * physParameters['electricConstant'] * ( (obj1.charge * obj2.charge) / ( distanceBetweenPoints * distanceBetweenPoints * distanceBetweenPoints * distanceBetweenPoints) );
  return electricalForce;
}

function calculateOriginGravitationalForce(obj) {
  const dist = obj.position.length();
  let gravForce = physParameters['originGravity'] * ( dist * dist );
  gravForce = (physParameters['originGravity'] >= 0) ? gravForce : 1/gravForce;

  return gravForce * gravity_damp_factor;
}

export {physics}