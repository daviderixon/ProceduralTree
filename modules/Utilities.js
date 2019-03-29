import * as THREE from 'three'
export function findPerpendicularVector(V){
    var X,Y,Z;
    var Perp = new THREE.Vector3();
    try{
        if(V.x !== 0){
            X = (-V.y - V.z)/V.x;
            Perp.set(X,1,1);
        }
        else if(V.y !== 0){
            Y = (-V.x - V.z)/V.y;
            Perp.set(1,Y,1);
        }
        else if(V.z !== 0){
            Z = (-V.x - V.y)/V.z;
            Perp.set(1,1,Z);
        }
        else{
            return null
        }
    }
    catch(e){
        throw e;
    }
    Perp.normalize();
    return Perp;
}
export function findPerpendicularVectorFromTwo(V1, V2){
    let Perp = new THREE.Vector3();
    try{
        Perp.crossVectors(V1, V2);
        Perp.normalize();
    }
    catch(e){
        throw e;
    }

    return Perp;
}
