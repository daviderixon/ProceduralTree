import * as THREE from 'three';
import SimpleTree from './SimpleTree';
import PineTree from './PineTree';
import Polygon from './Polygon';
import Leaf from './Leaf';
import Node from './Node';
import HLUNode from './HLUNode'
import ParametricTree from './ParametricTree';
import TwoPointCylinder from './TwoPointCylinder';
import * as BarkVertexShader from "../glsl/BarkVertexShader.glsl";
import * as BarkFragmentShader from "../glsl/BarkFragmentShader.glsl";

class TestModule{
    start(){
        var Tree,Leaves, TreeGroup;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        var startNode = new Node(0,0,0, new THREE.Vector3(0,1,0))
        var startHLUNode = new HLUNode(0,0,0,1);


        document.body.appendChild(renderer.domElement);

        var ParTree = new ParametricTree(11);
        ParTree.createMesh(startHLUNode);
        var material = new THREE.ShaderMaterial({
              vertexShader: BarkVertexShader ,
              fragmentShader:BarkFragmentShader ,
              uniforms: {
                  time: { type: 'f', value: 0 }
              },
              side: THREE.DoubleSide,
        });
        var material2 = new THREE.MeshBasicMaterial({
            color:0x003300,
            side : THREE.DoubleSide,
        })

        Tree = new THREE.Mesh(ParTree.Tree, material);
        Leaves = new THREE.Mesh(ParTree.Leaves,material2);
        console.log(ParTree.Leaves);

        scene.add(Tree);
        scene.add(Leaves);


        var CamDist = 70;
        var CamHeight = 40;
        camera.position.z = CamDist;
        camera.position.y = CamHeight;

        var animate = function(){
          requestAnimationFrame( animate );
          var r = Date.now() * 0.0005;
          camera.position.x = CamDist*Math.sin(r);
          camera.position.z = CamDist*Math.cos(r);
          camera.lookAt(new THREE.Vector3(0,CamHeight,0));

          renderer.render( scene, camera );
        }
        animate();
    }


}
export default TestModule
