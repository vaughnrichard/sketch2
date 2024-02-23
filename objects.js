import { sphere } from './sphere.js';

const sphereArray = []

const sphere0 = new sphere({
	position: new THREE.Vector3(3, 0, 0),
	pointsPerCircle: 50,
	num_lines: 40,
	radius: 1,
	color: 0x0fffff,
	velocity: new THREE.Vector3(0, 0, .01),
	mass: 1,
	charge: 1,
  id: 0
});
sphereArray.push(sphere0);

const sphere1 = new sphere({
	position: new THREE.Vector3(-3, 0, 0),
	pointsPerCircle: 50,
	num_lines: 40,
	radius: 1,
	color: 0xfffff0,
	velocity: new THREE.Vector3(0, 0, -.01),
	mass: 1,
	charge: 1,
  id: 0
});
sphereArray.push(sphere1);


export { sphereArray }