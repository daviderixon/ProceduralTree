import * as THREE from 'three'
import {findPerpendicularVector, findPerpendicularVectorFromTwo} from './Utilities'

class TwoPointBox{
    constructor( V1,  V2,  StartWidth, EndWidth, Segments){
        this.Normal = new THREE.Vector3();
        this.Vector1 = V1;
        this.Vector2 = V2;
        this.Normal.subVectors(V2,V1);
        this.NormalizedNormal = new THREE.Vector3();
        this.NormalizedNormal.copy(this.Normal);
        this.NormalizedNormal.normalize();
        this.StartWidth = StartWidth;
        this.EndWidth = EndWidth;
        this.Segments = Segments;
    }

    CreateMesh(){
        var YL = this.NormalizedNormal;
        var XL = findPerpendicularVector(YL);
        var ZL = findPerpendicularVectorFromTwo(YL,XL);

        var Translation= new THREE.Matrix4();
        Translation.set( 1, 0, 0, this.Vector1.x,
                       0, 1, 0, this.Vector1.y,
                       0, 0, 1, this.Vector1.z,
                       0, 0, 0, 1 );
        var Rotation= new THREE.Matrix4();
        Rotation.makeBasis(XL,YL,ZL);
        var world2local = new THREE.Matrix4();
        world2local.multiplyMatrices(Translation, Rotation);
        var local2world = new THREE.Matrix4();
        local2world.getInverse(world2local);

        var TempPoint;
        var geometry = new THREE.Geometry();
        for(var i = 0; i<this.Segments ; i+=1){
            TempPoint = new THREE.Vector3(Math.cos(i*(2*Math.PI/this.Segments))*this.StartWidth , 0, Math.sin(i*(2*Math.PI/this.Segments))*this.StartWidth);
            TempPoint.applyMatrix4(world2local);
            geometry.vertices.push(TempPoint);
        }
        for(var i = 0; i<this.Segments ; i+=1){
            TempPoint = new THREE.Vector3(Math.cos(i*(2*Math.PI/this.Segments))*this.EndWidth , 0, Math.sin(i*(2*Math.PI/this.Segments))*this.EndWidth);
            TempPoint.applyMatrix4(world2local);
            TempPoint.add(this.Normal);
            geometry.vertices.push(TempPoint);
        }
        for(var i = 0; i<this.Segments; i+=1){
            if(i == this.Segments-1){
                geometry.faces.push( new THREE.Face3( i, 0, this.Segments) );
                geometry.faces.push( new THREE.Face3( i, this.Segments, this.Segments+i) );
            }
            else{
                geometry.faces.push( new THREE.Face3( i, i+1, this.Segments+i+1 ) );
                geometry.faces.push( new THREE.Face3( i, this.Segments+i+1, this.Segments+i) );
            }
        }

        var material = new THREE.MeshBasicMaterial( { color: 0x8B4513, side: THREE.DoubleSide } );
        var mesh = new THREE.Mesh( geometry, material );
        return geometry;
    }
}
export default TwoPointBox;
