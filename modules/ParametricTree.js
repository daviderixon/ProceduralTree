import * as THREE from 'three';
import TwoPointCylinder from './TwoPointCylinder';
import HLUNode from './HLUNode';
import Polygon from './Polygon';

class ParametricTree {
	constructor(Iter) {
		this.Iterations = Iter;
		this.STR = '';
		this.Tree = new THREE.Geometry();
		this.Leaves = new THREE.Geometry();
	}

	developString() {
		let r1 = 0.90;
		let r2 = 0.6;
		let a0 = 42;
		let a2 = 45;
		let d = 137.5;
		let wr = 0.707;

		this.STR = 'A(10,1)';
		let tempVal = '';
		let tempStr = '';
		let Value = [];
		for (let i = 0; i <= this.Iterations; i += 1) {
			for (let k = 0; k < this.STR.length; k += 1) {
				tempVal = '';
				if (this.STR[k] === 'A') {
					if (this.STR[k + 1] === '(') {
						k += 2;
						while (this.STR[k] !== ')') {
							tempVal += this.STR[k];
							k += 1;
						}
						Value = tempVal.split(',').map(x => parseFloat(x));
						tempVal = '';
						// console.log("A(" + Value[0] + " , " + Value[1] + "): * ->  " + "!(" + Value[1] + ")F("+ Value[0]+")[&("+a0+")B("+Value[0]*r2+"," + Value[1]*wr+")]/("+d+")A("+Value[0]*r1+","+Value[1]*wr+")");
						tempStr = `${tempStr}!(${Value[1]})F(${Value[0]})[&(${a0})B(${Value[0] * r2},${Value[1] * wr})]/(${d})A(${Value[0] * r1},${Value[1] * wr})`;
					}
				} else if (this.STR[k] === 'B') {
					if (this.STR[k + 1] === '(') {
						k += 2;
						while (this.STR[k] !== ')') {
							tempVal += this.STR[k];
							k += 1;
						}
						Value = tempVal.split(',').map(x => parseFloat(x));
						tempVal = '';
						// console.log("B(" + Value[0] + " , " + Value[1] + "): * ->  " + "!(" + Value[1] + ")F("+ Value[0]+")[-("+a2+")$C("+Value[0]*r2+"," + Value[1]*wr+")]C("+Value[0]*r1+","+Value[1]*wr+")");
						tempStr = `${tempStr}!(${Value[1]})F(${Value[0]})[-(${a2})$C(${Value[0] * r2},${Value[1] * wr})]C(${Value[0] * r1},${Value[1] * wr})`;
					}
				} else if (this.STR[k] === 'C') {
					if (this.STR[k + 1] === '(') {
						k += 2;
						while (this.STR[k] !== ')') {
							tempVal += this.STR[k];
							k += 1;
						}
						Value = tempVal.split(',').map(x => parseFloat(x));
						tempVal = '';
						tempStr = `${tempStr}!(${Value[1]})F(${Value[0]})[+(${a2})$B(${Value[0] * r2},${Value[1] * wr})]B(${Value[0] * r1},${Value[1] * wr})[{*G(1)*+(90)G(1)*}{*G(1)*-(90)G(1)*}{+(90)G(1)*+(135)G(1)*+(45)G(1)*}]`;
					}
				} else {
					tempStr += this.STR[k];
				}
			}

			this.STR = tempStr;
			tempStr = '';
		}
	}

	createMesh(SP) {
		this.developString();
		let Stack = [];
		let PolyStack = [];
		let Cylinder;
		let temp = SP;
		let tempVal;
		let StackTemp;
		let PolyTemp = new Polygon();
		let Value;

		let child;
		let LineWidth = 1;
		let Segments = 32;
		let G_TEMP = new THREE.Geometry();
		let DefDegree = 22;

		for (let k = 0; k < this.STR.length; k += 1) {
			tempVal = '';
			switch (this.STR.charAt(k)) {
			case 'F':
				if (this.STR[k + 1] === '(') {
					k += 2;
					while (this.STR[k] !== ')') {
						tempVal += this.STR[k];
						k += 1;
					}
				}
				child = temp.moveForward(parseFloat(tempVal), LineWidth);
				Cylinder = new TwoPointCylinder(temp.position, child.position, temp.Width, child.Width, Segments);
				G_TEMP = Cylinder.CreateMesh();
				// G_TEMP.updateMatrix();
				this.Tree.merge(G_TEMP);
				temp = child;
				break;
			case 'G':
				if (this.STR[k + 1] === '(') {
					k += 2;
					while (this.STR[k] !== ')') {
						tempVal += this.STR[k];
						k += 1;
					}
					Value = tempVal.split(',').map(x => parseFloat(x));
					temp.moveThisForward(Value[0]);
				} else {
					temp.moveThisForward(1);
				}

				break;
			case '+':
				if (this.STR[k + 1] === '(') {
					k += 2;
					while (this.STR[k] !== ')') {
						tempVal += this.STR[k];
						k += 1;
					}
					temp.rotateU(parseFloat(tempVal));
				} else {
					temp.rotateU(DefDegree);
				}


				break;
			case '-':
				if (this.STR[k + 1] === '(') {
					k += 2;
					while (this.STR[k] !== ')') {
						tempVal += this.STR[k];
						k += 1;
					}

					temp.rotateU(-1 * parseFloat(tempVal));
				} else {
					temp.rotateU(-1 * DefDegree);
				}

				break;
			case '&':
				if (this.STR[k + 1] === '(') {
					k += 2;
					while (this.STR[k] !== ')') {
						tempVal += this.STR[k];
						k += 1;
					}
					temp.rotateL(parseFloat(tempVal));
				} else {
					temp.rotateL(DefDegree);
				}

				break;
			case '^':
				if (this.STR[k + 1] === '(') {
					k += 2;
					while (this.STR[k] !== ')') {
						tempVal += this.STR[k];
						k += 1;
					}
					temp.rotateL(-1 * parseFloat(tempVal));
				} else {
					temp.rotateL(-1 * DefDegree);
				}

				break;
			case '\\':
				if (this.STR[k + 1] === '(') {
					k += 2;
					while (this.STR[k] !== ')') {
						tempVal += this.STR[k];
						k += 1;
					}
					temp.rotateH(parseFloat(tempVal));
				} else {
					temp.rotateH(Def_Degree);
				}

				break;
			case '/':
				if (this.STR[k + 1] === '(') {
					k += 2;
					while (this.STR[k] !== ')') {
						tempVal += this.STR[k];
						k += 1;
					}
					temp.rotateH(-1 * parseFloat(tempVal));
				} else {
					temp.rotateH(-1 * DefDegree);
				}

				break;
			case '|':
				temp.rotateL(180);
				break;
			case '!':
				if (this.STR[k + 1] === '(') {
					k += 2;
					while (this.STR[k] !== ')') {
						tempVal += this.STR[k];
						k += 1;
					}
					LineWidth = parseFloat(tempVal);
				}
				break;
			case '[':
				StackTemp = new HLUNode(temp.position.x, temp.position.y, temp.position.z, temp.Width);
				StackTemp.H.copy(temp.H);
				StackTemp.L.copy(temp.L);
				StackTemp.U.copy(temp.U);
				Stack.push(StackTemp);
				break;
			case ']':
				temp = Stack.pop();
				break;
			case '{':
				PolyStack.push(PolyTemp);
				PolyTemp = new Polygon();
				break;
			case '}':
				G_TEMP = PolyTemp.buildGeometry();
				this.Leaves.merge(G_TEMP);
				PolyTemp = PolyStack.pop();
				break;
			case '*':
				PolyTemp.push(temp.position);
				break;
			case '$':
				temp.RollTurtle();
				break;
			default:
				break;
			}
		}
	}
}

export default ParametricTree;
