import * as THREE from 'three';

class Node {
	constructor(a, b, c, Dir) {
		this.position = new THREE.Vector3(a, b, c);
		this.direction = new THREE.Vector3(Dir.x, Dir.y, Dir.z);
		this.direction.normalize();
	}

	moveForward(Distance) {
		let V = new THREE.Vector3();
		V.addVectors(this.position, this.direction.multiplyScalar(Distance));
		this.direction.normalize();
		let N = new Node(V.x, V.y, V.z, this.direction);
		return N;
	}

	rotate(unit, rad) {
		let unitVector;
		switch (unit) {
		case 0:
			unitVector = new THREE.Vector3(1, 0, 0);
			break;
		case 1:
			unitVector = new THREE.Vector3(0, 1, 0);
			break;
		case 2:
			unitVector = new THREE.Vector3(0, 0, 1);
			break;
		default:
			Error('unit has to be either 0, 1 or 2');
		}
		this.direction.applyAxisAngle(unitVector, rad);
	}

	log() {
		console.log(`POSITION - X: ${this.position.x} Y: ${this.position.y} Z: ${this.position.z}`);
		console.log(`DIRECTION - X: ${this.direction.x} Y: ${this.direction.y} Z: ${this.direction.z}`);
	}
}
export default Node;
