/**
 * My second sketch.
 */

// look into hydra js library

import * as THREE from 'three';
import { vis } from './init.js';
import { sphere } from './circle.js';
import { changeGravity } from './physSim.js';

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
	velocity: new THREE.Vector3(0, 0, .1)
})

camera.position.set(0, 5, 0);

camera.up.set(0,0,1);
camera.lookAt( 0, 0, 0);

let step = 0;

function animate() {
	requestAnimationFrame( animate );

	vis.objects.forEach( (sphere) => {
		// 
		// if (step++ % 60 === 0) {
		// gravityValue = gravityValue + (Math.cos(step++) * .01);
		changeGravity((Math.cos(step++) * .005) + .001)
		testsphere.takeStep();
		testsphere.vibrate();
		// }

		// const x_pos = Math.cos(step * .01) * 1;
		// const z_pos = Math.sin(step * .01) * 1;
		// step++;
		// const newPos = new THREE.Vector3( -x_pos, 0, z_pos );

		// sphere.moveToWorldPos(newPos);
		// vis.objects[0].takeStep();

		// vis.objects.forEach( (test) => {
		// 	test.takeStep();
		// })
	});

	renderer.render( scene, camera );
}

animate();