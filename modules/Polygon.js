import * as THREE from 'three';

class Polygon {
	constructor() {
		this.Count = 0;
		this.geo = new THREE.Geometry();
	}

	push(V) {
		this.Count += 1;
		let TEMP = new THREE.Vector3(V.x, V.y, V.z);
		this.geo.vertices.push(TEMP);
	}

	buildGeometry() {
		for (let i = 0; i < this.Count - 2; i += 1) {
			this.geo.faces.push(new THREE.Face3(i, i + 1, i + 2));
		}
		return this.geo;
	}
}
export default Polygon;
