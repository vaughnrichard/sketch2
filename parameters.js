import { sphere } from './sphere.js';
import * as THREE from 'three';


class constant {
  constructor(val=1) {
    this.value = val;
  }

  update(val) {
    this.value = val;
  }
};

const physParameters = {
  originGravity : 1,
  particleGravity : 1,
  electricConstant : 1,
  maxVelocityConstant : 1,
  airResistanceConstant : 1
}

const simParameters = {
  stepSize: 1/60,
  paused: false,

  particleList: [],

  // new particle parameters
  x: 0,
  y: 0,
  z: 0,
  vx: 0,
  vy: 0,
  vz: 0,
  radius: 1,
  color: 0xffffff,
  mass: 1,
  charge: 1,
  addPart: addParticle
}

// const defaultParticleParams = {
//   position: new THREE.Vector3(0, 0, 0),
//   pointsPerCircle: 50,
//   num_lines: 40,
//   radius: 1,
//   color: 0xffffff,
//   velocity: new THREE.Vector3(0, 0, 0),
//   mass: 1,
//   charge: 1,
//   id: simParameters.particleList.length
// }

const defaultSimParams = {
  x: 0,
  y: 0,
  z: 0,
  vx: 0,
  vy: 0,
  vz: 0,
  radius: 1,
  color: 0xffffff,
  mass: 1,
  charge: 1
}

function addParticle() {
  const sp = simParameters;
  const pos = new THREE.Vector3(sp.x, sp.y, sp.z);
  const velo = new THREE.Vector3(sp.vx, sp.vy, sp.vz);
  new sphere({
    position: pos,
    pointsPerCircle: 50,
    num_lines: 40,
    radius: sp.radius,
    color: sp.color,
    velocity: velo,
    mass: sp.mass,
    charge: sp.charge,
    id: simParameters.particleList.length
  });

  for (const property in defaultSimParams) {
    simParameters[property] = defaultSimParams[property];
  }
}

export { physParameters, simParameters }