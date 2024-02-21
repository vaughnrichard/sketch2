import * as THREE from 'three';
import { vis } from './init.js';

/**
 * Simulation Parameters
 */

const gravityValue = 0.5;
const stepSize = 1/30;


/**
 * Testing
 */

class phys {
  constructor(pos, velo) {
    this.position = (pos === undefined) ? new THREE.Vector3(0, 0, 0) : pos;
    this.velocity = (velo === undefined) ? new THREE.Vector3(0, 0, 0) : velo;
  }

  takeStep() {
    const mag = Math.max(1, this.position.length());
    const gravityScale = (1 / (mag * mag));
    const gravityVector = this.position.clone();
    gravityVector.multiplyScalar(-gravityScale);
    // console.log(gravityVector);

    const deltaPosition = new THREE.Vector3().addVectors(this.velocity, gravityVector).multiplyScalar(stepSize);
    // console.log(deltaPosition);
    this.position.add(deltaPosition);
    this.velocity.copy(deltaPosition.multiplyScalar(1/stepSize));


  }
}

class testObj extends phys {
  constructor() {
    const position = new THREE.Vector3(25, 0, 0);
    const velocity = new THREE.Vector3(0, 0, 5);
    super(position, velocity);
    const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.copy(position);
    this.position = sphere.position;
    console.log(sphere);
    vis.scene.add(sphere);
    

    this.obj = sphere;

  }
}

function addTest(velo) {
  const testingObj = new testObj();
  testingObj.velocity = velo;
  vis.objects.push(testingObj);
}

export {addTest}