import SimpleTree from './SimpleTree';

class PineTree extends SimpleTree {
	developString() {
		this.STR = 'VZFFFF';
		let temp = '';
		for (let itr = 1; itr <= this.Iterations; itr += 1) {
			for (let k = 0; k < this.STR.length; k += 1) {
				switch (this.STR[k]) {
				case 'V':
					temp += '[+++W][---W]YV';
					break;
				case 'W':
					temp += '+X[-W]Z';
					break;
				case 'X':
					temp += '-W[+X]Z';
					break;
				case 'Y':
					temp += 'YZ';
					break;
				case 'Z':
					temp += '[-FFF][+FFF]F';
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
}
export default PineTree;
