/**
 * My second sketch.
 */

// look into hydra js library

import * as THREE from 'three';
import { vis } from './init.js';
import { addCircletoScene } from './circle.js';

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
for (let i = 0; i < num_lines; i++) {
	// addCircletoScene(50, 1, new THREE.Vector3(0, 0, i / 3), [0, Math.PI / 2, 0] );
	addCircletoScene(50, 1, new THREE.Vector3(0, 0, 0), [(i * (Math.PI * 2 / num_lines)), Math.PI / 2, 0], 0xff0000);
	addCircletoScene(50, 1, new THREE.Vector3(0, 0, 0), [0, (i * (Math.PI * 2 / num_lines)), 0], 0xff0000);

	// addCircletoScene(50, 1, new THREE.Vector3(-2, 0, 0), [(i * (Math.PI * 2 / num_lines)), Math.PI / 2, 0], 0x00ff00);
	// addCircletoScene(50, 1, new THREE.Vector3(-2, 0, 0), [0, (i * (Math.PI * 2 / num_lines)), 0], 0x00ff00);

	// addCircletoScene(50, 1, new THREE.Vector3(2, 0, 0), [(i * (Math.PI * 2 / num_lines)), Math.PI / 2, 0], 0x0000ff);
	// addCircletoScene(50, 1, new THREE.Vector3(2, 0, 0), [0, (i * (Math.PI * 2 / num_lines)), 0], 0x0000ff);

	// addCircletoScene(50, 3, new THREE.Vector3(0, 0, 0), [(i * (Math.PI * 2 / num_lines)), Math.PI / 2, 0]);
	// addCircletoScene(50, 3, new THREE.Vector3(0, 0, 0), [0, (i * (Math.PI * 2 / num_lines)), 0]);
}
// addCircletoScene(50, 1, 'yz');

camera.position.set(0, 5, 0);

camera.up.set(0,0,1);
// camera.lookAt( cube.position );
camera.lookAt( 0, 0, 0);

function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// vis.objects.forEach( (line) => {
	// 	line.rotateOnAxis(new THREE.Vector3(0, 0, 1), .002);
	// })
	// vis.objects[0].movePoints();
	// if (vis.objects.length > 0) {
	// 	vis.objects[0].movePoints();
	// 	// console.log(vis.objects)
	// }

	// vis.objects.forEach( (circle) => {
	// 	circle.movePoints();
	// });

	renderer.render( scene, camera );
}

animate();