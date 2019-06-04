import * as THREE from 'three';
import TwoPointBox from './TwoPointBox';
import Node from './Node';

class SimpleTree {
	constructor(Iter) {
		this.Iterations = Iter;
	}

	developString() {
		this.STR = 'X';
		let temp = '';
		for (let itr = 1; itr <= this.Iterations; itr += 1) {
			for (let k = 0; k < this.STR.length; k += 1) {
				switch (this.STR[k]) {
				case 'F':
					temp += 'FF';
					break;
				case 'X':
					temp += 'F-[[X]+X]+F[+FX]-X';
					break;
				default:
					temp += this.STR[k];
					break;
				}
			}
			this.STR = temp;
			temp = '';
		}
	}

	createMesh(SP) {
		this.developString();
		let Stack = [];
		let Box;
		let temp = SP;
		let StackTemp;
		let child;
		let Dist = 1;
		let Rotation = 22.5 * Math.PI / 180;
		let Rotation2 = 50 * Math.PI / 180;
		let group = new THREE.Group();
		for (let k = 0; k < this.STR.length; k += 1) {
			// console.log(this.STR.charAt(k));
			switch (this.STR.charAt(k)) {
			case 'F':
				child = temp.moveForward(Dist);
				Box = new TwoPointBox(temp.position, child.position, 0.25);
				group.add(Box.CreateMesh());
				temp = child;
				break;
			case '-':
				temp.rotate(2, -1 * Rotation);
				Rotation2 /= 2;
				break;
			case '+':
				temp.rotate(1, Rotation2);
				Rotation2 /= 2;
				break;
			case '|':
				temp.rotate(2, Math.PI);
				break;
			case '[':
				StackTemp = new Node(temp.position.x, temp.position.y, temp.position.z, temp.direction);
				Stack.push(StackTemp);
				break;
			case ']':
				temp = Stack.pop();
				break;
			default:
				break;
			}
		}
		return group;
	}
}
export default SimpleTree;
