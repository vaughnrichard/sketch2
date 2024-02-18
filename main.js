/**
 * My second sketch.
 */

// look into hydra js library

import * as THREE from 'three';
import { vis } from './init.js';
import { addSphere } from './circle.js';

const scene = vis.scene;
const renderer = vis.renderer;
const camera = vis.camera;

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );

// const material = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// Create a sine-like wave
// const curve = new THREE.SplineCurve( [
// 	new THREE.Vector2( -10, 0 ),
// 	new THREE.Vector2( -5, 5 ),
// 	new THREE.Vector2( 0, 0 ),
// 	new THREE.Vector2( 5, -5 ),
// 	new THREE.Vector2( 10, 0 )
// ] );

// const points = curve.getPoints( 50 );
// const geometry = new THREE.BufferGeometry().setFromPoints( points );

// const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// // Create the final object to add to the scene
// const splineObject = new THREE.Line( geometry, material );

// scene.add(splineObject);

// const floorGeometry = new THREE.PlaneGeometry( 100, 100 );
// const floorMaterial = new THREE.MeshBasicMaterial( {color: 0x8f8f8f, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( floorGeometry, floorMaterial );
// scene.add( plane );

// cube.position.set(0, 0, 5);

const num_lines = 40;
const num_points = 50;
addSphere(num_lines, num_points, 1, new THREE.Vector3(0, 0, 0), 0xFFF000);

camera.position.set(0, 5, 0);

camera.up.set(0,0,1);
// camera.lookAt( cube.position );
camera.lookAt( 0, 0, 0);

let step = 0;

function animate() {
	requestAnimationFrame( animate );

	vis.objects.forEach( (sphere) => {
		// sphere.vibrate();

		const x_pos = Math.cos(step * .01) * 1;
		const z_pos = Math.sin(step * .01) * 1;
		step++;
		const newPos = new THREE.Vector3( -x_pos, 0, z_pos );

		sphere.moveToWorldPos(newPos);
	});

	renderer.render( scene, camera );
}

animate();