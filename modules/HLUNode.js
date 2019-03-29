import * as THREE from 'three'

class HLUNode{
    constructor(a,b,c,w){
        this.position = new THREE.Vector3(a,b,c);
        this.H = new THREE.Vector3(0,1,0);
        this.L = new THREE.Vector3(-1,0,0);
        this.U = new THREE.Vector3(0,0,-1);

        this.V = new THREE.Vector3(1,0,0);
        this.Width = w;

    }
    moveForward(Distance, Width){
        var V = new THREE.Vector3();
        var AddVec = this.H;
        AddVec.multiplyScalar(Distance);

        V.addVectors(this.position, AddVec);
        var N = new HLUNode(V.x,V.y,V.z, Width);
        N.H = this.H;
        N.L = this.L;
        N.U = this.U;

        return N;
    }
    moveThisForward(Distance){
        var AddVec =  this.H;
        AddVec.multiplyScalar(Distance);
        this.position.add(AddVec);

    }
    rotateU(deg){
        var RU = new THREE.Matrix3();
        RU.set(
            Math.cos(deg)   , Math.sin(deg), 0,
            -1*Math.sin(deg), Math.cos(deg), 0,
            0               , 0            , 1
        )
        var HLUMAT = new THREE.Matrix3();
        HLUMAT.set(this.H.x, this.L.x, this.U.x,
                   this.H.y, this.L.y, this.U.y,
                   this.H.z, this.L.z, this.U.z);
       HLUMAT.multiply(RU);
       var HLU = HLUMAT.toArray();
       this.H.fromArray(HLU);
       this.L.fromArray(HLU, 3);
       this.U.fromArray(HLU, 6);
       this.H.normalize();
       this.L.normalize();
       this.U.normalize();

    }
    rotateL(deg){
        var RL = new THREE.Matrix3();
        RL.set(
            Math.cos(deg), 0, -1*Math.sin(deg),
            0            , 1, 0,
            Math.sin(deg), 0, Math.cos(deg),
        )
        var HLUMAT = new THREE.Matrix3();
        HLUMAT.set(this.H.x, this.L.x, this.U.x,
                   this.H.y, this.L.y, this.U.y,
                   this.H.z, this.L.z, this.U.z);
       HLUMAT.multiply(RL);
       var HLU = HLUMAT.toArray();
       this.H.fromArray(HLU);
       this.L.fromArray(HLU, 3);
       this.U.fromArray(HLU, 6);
       this.H.normalize();
       this.L.normalize();
       this.U.normalize();

    }
    rotateH(deg){
        var RH = new THREE.Matrix3();
        RH.set(
            1,             0,                0,
            0, Math.cos(deg), -1*Math.sin(deg),
            0, Math.sin(deg), Math.cos(deg)
        );
        var HLUMAT = new THREE.Matrix3();
        HLUMAT.set(this.H.x, this.L.x, this.U.x,
                   this.H.y, this.L.y, this.U.y,
                   this.H.z, this.L.z, this.U.z);

        HLUMAT.multiply(RH);
        var HLU = HLUMAT.toArray();
        this.H.fromArray(HLU);
        this.L.fromArray(HLU, 3);
        this.U.fromArray(HLU, 6);
        this.H.normalize();
        this.L.normalize();
        this.U.normalize();

    }
    RollTurtle(){
        this.L.crossVectors(this.L,this.H);
        this.L.normalize();

        this.U.crossVectors(this.H,this.L);
    }
    logHLUMat(HLUMAT){
        var HLU = HLUMAT.toArray();
        console.log("H( " + HLU[0] + ", " + HLU[1] + ", " + HLU[2] + " )" );
        console.log("L( " + HLU[3] + ", " + HLU[4] + ", " + HLU[5] + " )" );
        console.log("U( " + HLU[6] + ", " + HLU[7] + ", " + HLU[8] + " )" );
    }
    log(){
        console.log("POSITION - X: " + this.position.x + " Y: " + this.position.y + " Z: " + this.position.z);
        console.log("H - X: " + this.H.x + " Y: " + this.H.y + " Z: " + this.H.z);
        console.log("L - X: " + this.L.x + " Y: " + this.L.y + " Z: " + this.L.z);
        console.log("U - X: " + this.U.x + " Y: " + this.U.y + " Z: " + this.U.z);
    }


}
export default HLUNode
