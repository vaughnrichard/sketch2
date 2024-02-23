import * as THREE from 'three';
import { vis } from './init.js';

/**
 * Simulation Parameters
 */

let gravityValue = .001;
const stepSize = 1/30;


/**
 * Testing
 */

class physics {
  constructor(pos, velo) {
    this.origin = (pos === undefined) ? new THREE.Vector3(0, 0, 0) : pos;
    this.velocity = (velo === undefined) ? new THREE.Vector3(0, 0, 0) : velo;
  }

  takeStep() {
    const mag = Math.max(1, this.origin.length());
    
    const gravityScale = (1 / (mag * mag));
    const gravityVector = this.origin.clone();
    // console.log("gravity vector", gravityVector);
    console.log("Begin step **********");
    console.log("gravity scale", gravityScale);
    console.log("origin", this.origin);
    console.log("End step **********")
    gravityVector.multiplyScalar(-gravityScale * gravityValue);
    // console.log(gravityVector);

    const deltaPosition = new THREE.Vector3().addVectors(this.velocity, gravityVector).multiplyScalar(stepSize);
    // console.log(deltaPosition);
    this.origin.add(deltaPosition);
    this.velocity.copy(deltaPosition.multiplyScalar(1/stepSize));


  }
}

class testObj extends physics {
  constructor() {
    const position = new THREE.Vector3(10, 0, 0);
    const velocity = new THREE.Vector3(0, 0, 1000);
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

function changeGravity(val) {
  gravityValue = val;
}

export {physics, changeGravity}