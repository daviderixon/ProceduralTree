import * as THREE from 'three';
import { findPerpendicularVector, findPerpendicularVectorFromTwo } from './Utilities';

class TwoPointBox {
	constructor(V1, V2, w) {
		this.Normal = new THREE.Vector3();
		this.Vector1 = V1;
		this.Vector2 = V2;
		this.Normal.subVectors(V2, V1);
		this.NormalizedNormal = new THREE.Vector3();
		this.NormalizedNormal.copy(this.Normal);
		this.NormalizedNormal.normalize();
		this.width = w;
	}

	CreateMesh() {
		let YL = this.NormalizedNormal;
		let XL = findPerpendicularVector(YL);
		let ZL = findPerpendicularVectorFromTwo(YL, XL);

		let Translation = new THREE.Matrix4();
		Translation.set(1, 0, 0, this.Vector1.x,
			0, 1, 0, this.Vector1.y,
			0, 0, 1, this.Vector1.z,
			0, 0, 0, 1);
		let Rotation = new THREE.Matrix4();
		Rotation.makeBasis(XL, YL, ZL);
		let world2local = new THREE.Matrix4();
		world2local.multiplyMatrices(Translation, Rotation);
		let local2world = new THREE.Matrix4();
		local2world.getInverse(world2local);

		let FirstCorner = new THREE.Vector3(this.width / 2, 0, this.width / 2);
		FirstCorner.applyMatrix4(world2local);
		let SecondCorner = new THREE.Vector3(this.width / 2, 0, -1 * this.width / 2);
		SecondCorner.applyMatrix4(world2local);
		let ThirdCorner = new THREE.Vector3(-1 * this.width / 2, 0, this.width / 2);
		ThirdCorner.applyMatrix4(world2local);
		let FourthCorner = new THREE.Vector3(-1 * this.width / 2, 0, -1 * this.width / 2);
		FourthCorner.applyMatrix4(world2local);
		let geometry = new THREE.Geometry();
		geometry.vertices.push(FirstCorner);
		geometry.vertices.push(SecondCorner);
		geometry.vertices.push(ThirdCorner);
		geometry.vertices.push(FourthCorner);

		let FithCorner = new THREE.Vector3().addVectors(FirstCorner, this.Normal);
		let SixthCorner = new THREE.Vector3().addVectors(SecondCorner, this.Normal);
		let SeventhCorner = new THREE.Vector3().addVectors(ThirdCorner, this.Normal);
		let EightCorner = new THREE.Vector3().addVectors(FourthCorner, this.Normal);


		geometry.vertices.push(FithCorner);
		geometry.vertices.push(SixthCorner);
		geometry.vertices.push(SeventhCorner);
		geometry.vertices.push(EightCorner);

		geometry.faces.push(new THREE.Face3(3, 1, 5));
		geometry.faces.push(new THREE.Face3(3, 5, 7));

		geometry.faces.push(new THREE.Face3(7, 5, 4));
		geometry.faces.push(new THREE.Face3(7, 4, 6));

		geometry.faces.push(new THREE.Face3(1, 0, 4));
		geometry.faces.push(new THREE.Face3(1, 4, 5));

		geometry.faces.push(new THREE.Face3(3, 7, 6));
		geometry.faces.push(new THREE.Face3(3, 6, 2));

		geometry.faces.push(new THREE.Face3(0, 2, 6));
		geometry.faces.push(new THREE.Face3(0, 6, 4));

		geometry.faces.push(new THREE.Face3(0, 1, 3));
		geometry.faces.push(new THREE.Face3(0, 3, 2));

		let material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
		let mesh = new THREE.Mesh(geometry, material);
		return mesh;
	}
}
export default TwoPointBox;
