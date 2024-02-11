/**
 * My second sketch.
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/+esm';
import { vis } from './init.js';
import { addCircletoScene } from './misc.js';

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

const floorGeometry = new THREE.PlaneGeometry( 100, 100 );
const floorMaterial = new THREE.MeshBasicMaterial( {color: 0x8f8f8f, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( floorGeometry, floorMaterial );
scene.add( plane );

// cube.position.set(0, 0, 5);

addCircletoScene(50, 1, 'xz');
addCircletoScene(50, 1, 'yz');

camera.position.set(1, 5, 0);

camera.up.set(0,0,1);
// camera.lookAt( cube.position );
camera.lookAt( 0, 0, 0);

function animate() {
	// requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();