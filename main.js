/**
 * My second sketch.
 */

// look into hydra js library

import * as THREE from 'three';
import { vis } from './init.js';
import { sphere } from './sphere.js';

const scene = vis.scene;
const renderer = vis.renderer;
const camera = vis.camera;

const geometry = new THREE.SphereGeometry( 0.25, 100, 100 );

const material = new THREE.MeshBasicMaterial( { color: 0x3F3F3F } );
const origin = new THREE.Mesh( geometry, material );
origin.position.set(0, 0, 0);
scene.add( origin );

const testsphere = new sphere({
	origin: new THREE.Vector3(3, 0, 0),
	pointsPerCircle: 50,
	num_lines: 40,
	radius: 1,
	color: 0xff0000,
	velocity: new THREE.Vector3(0, 0, .01),
	mass: 1,
	charge: 1
})

camera.position.set(0, 5, 0);

camera.up.set(0,0,1);
camera.lookAt( 0, 0, 0);

let step = 0;

function animate() {
	requestAnimationFrame( animate );

	vis.objects.forEach( (sphere) => {
		testsphere.takeStep();
	});

	renderer.render( scene, camera );
}

animate();