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
        var Tree, TreeGroup;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        var startNode = new Node(0,0,0, new THREE.Vector3(0,1,0))
        var startHLUNode = new HLUNode(0,0,0,1);

        document.body.appendChild(renderer.domElement);

        var ParTree = new Leaf(5);
        var TreeGeometry = ParTree.createMesh(startHLUNode);
        console.log(TreeGeometry)
        var material = new THREE.ShaderMaterial({
              vertexShader: BarkVertexShader ,
              fragmentShader:BarkFragmentShader ,
              uniforms: {
                  time: { type: 'f', value: 0 }
              },
              side: THREE.DoubleSide,
        });
        var material2 = new THREE.MeshBasicMaterial({
            color:0x00ff00,
            side : THREE.DoubleSide,
        })

        Tree = new THREE.Mesh(TreeGeometry, material2);
        /*var C = new TwoPointCylinder(new THREE.Vector3(0,0,0), new THREE.Vector3(2,2,2), 3,2,8);
        var CG = C.CreateMesh();
        scene.add(CG);*/



        //Tree = new SimpleTree(5);
        //TreeGroup = Tree.createMesh(startNode);

        /*var Leafs = new THREE.Geometry();
        var Poly = new Polygon();
        Poly.push(new THREE.Vector3(0,0,0));
        Poly.push(new THREE.Vector3(1,0,0));
        Poly.push(new THREE.Vector3(1,1,0));
        Poly.push(new THREE.Vector3(1,1,2));
        Poly.push(new THREE.Vector3(1,1,3));
        var GEO = Poly.buildGeometry();
        Leafs.merge(GEO);
        var Poly2 = new Polygon();
        Poly2.push(new THREE.Vector3(1,1,1));
        Poly2.push(new THREE.Vector3(1,0,1));
        Poly2.push(new THREE.Vector3(0,1,1));
        var GEO = Poly2.buildGeometry();
        Leafs.merge(GEO);
        var MESH = new THREE.Mesh(Leafs, material2);
        scene.add(MESH);*/

        scene.add(Tree);


        var CamDist = 1;
        var CamHeight = 0;
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
