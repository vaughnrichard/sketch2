/**
 * My second sketch.
 */

// look into hydra js library

import * as THREE from 'three';
import { vis } from './init.js';
import { sphere } from './sphere.js';
import { simParameters } from './parameters.js';


const scene = vis.scene;
const renderer = vis.renderer;
const camera = vis.camera;

const geometry = new THREE.SphereGeometry( 0.25, 100, 100 );

const material = new THREE.MeshBasicMaterial( { color: 0x3F3F3F } );
const origin = new THREE.Mesh( geometry, material );
origin.position.set(0, 0, 0);
scene.add( origin );

camera.position.set(0, 10, 0);

camera.up.set(0,0,1);
camera.lookAt( 0, 0, 0);

let step = 0;

function animate() {
	requestAnimationFrame( animate );

	if (!simParameters.paused) {
		vis.objects.forEach( (sphere) => {
			sphere.takeStep();
			// sphere.vibrate();
		});
	}

	renderer.render( scene, camera );
}

const sphereArray = []

const sphere0 = new sphere({
	position: new THREE.Vector3(3, 0, 0),
	pointsPerCircle: 50,
	num_lines: 40,
	radius: 1,
	color: 0x0fffff,
	velocity: new THREE.Vector3(0, -.02, 0),
	mass: 1,
	charge: 1,
  id: 0
});
sphereArray.push(sphere0);

const sphere1 = new sphere({
	position: new THREE.Vector3(0, 0, 0),
	pointsPerCircle: 50,
	num_lines: 40,
	radius: 1,
	color: 0xffff0f,
	velocity: new THREE.Vector3(0, .02, 0),
	mass: 1,
	charge: 1,
  id: 1
});
sphereArray.push(sphere1);

const sphere2 = new sphere({
	position: new THREE.Vector3(-3, 0, 3),
	pointsPerCircle: 50,
	num_lines: 40,
	radius: 1,
	color: 0xff0fff,
	velocity: new THREE.Vector3(0, 0, 0),
	mass: 1,
	charge: 1,
  id: 2
});
sphereArray.push(sphere2);

const sphere3 = new sphere({
	position: new THREE.Vector3(5, 2, -5),
	pointsPerCircle: 50,
	num_lines: 40,
	radius: 1,
	color: 0xff0000,
	velocity: new THREE.Vector3(0, 0, 0),
	mass: 1,
	charge: 1,
  id: 3
});
sphereArray.push(sphere3);

animate();

export {sphereArray}