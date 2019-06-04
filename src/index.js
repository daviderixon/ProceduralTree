import * as THREE from 'three';
import ParametricTree from '../modules/ParametricTree';
import HLUNode from '../modules/HLUNode';
import * as BarkVertexShader from '../glsl/BarkVertexShader.glsl';
import * as BarkFragmentShader from '../glsl/BarkFragmentShader.glsl';


/* let tm = new TestModule();
tm.start(); */
let Tree;
let Leaves;
/* let TreeGroup; */
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x7b7b7b, 1);
/* let startNode = new Node(0, 0, 0, new THREE.Vector3(0, 1, 0)); */
let startHLUNode = new HLUNode(0, 0, 0, 1);


document.body.appendChild(renderer.domElement);

let ParTree = new ParametricTree(12);
ParTree.createMesh(startHLUNode);
let material = new THREE.ShaderMaterial({
	vertexShader: BarkVertexShader,
	fragmentShader: BarkFragmentShader,
	uniforms: {
		time: { type: 'f', value: 0 },
	},
	side: THREE.DoubleSide,
});
let material2 = new THREE.MeshBasicMaterial({
	color: 0x003300,
	side: THREE.DoubleSide,
});

Tree = new THREE.Mesh(ParTree.Tree, material);
Leaves = new THREE.Mesh(ParTree.Leaves, material2);
console.log(ParTree.Leaves);

scene.add(Tree);
scene.add(Leaves);


let CamDist = 70;
let CamHeight = 40;
camera.position.z = CamDist;
camera.position.y = CamHeight;

// eslint-disable-next-line func-names
let animate = function () {
	requestAnimationFrame(animate);
	let r = Date.now() * 0.0005;
	camera.position.x = CamDist * Math.sin(r);
	camera.position.z = CamDist * Math.cos(r);
	camera.lookAt(new THREE.Vector3(0, CamHeight, 0));

	renderer.render(scene, camera);
};
animate();
