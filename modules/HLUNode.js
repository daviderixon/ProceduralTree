import * as THREE from 'three'

class HLUNode{
    constructor(a,b,c,w){
        this.position = new THREE.Vector3(a,b,c);
        this.H = new THREE.Vector3(0,1,0);
        this.L = new THREE.Vector3(-1,0,0);
        this.U = new THREE.Vector3(0,0,-1);

        this.Width = w;

    }
    moveForward(Distance, Width){
        var V = new THREE.Vector3();
        var AddVec = new THREE.Vector3();
        AddVec.copy(this.H);
        AddVec.multiplyScalar(Distance);

        V.addVectors(this.position, AddVec);
        var N = new HLUNode(V.x,V.y,V.z, Width);
        N.H.copy(this.H);
        N.L.copy(this.L);
        N.U.copy(this.U);

        return N;
    }
    moveThisForward(Distance){
        var AddVec =  new THREE.Vector3(this.H.x,this.H.y,this.H.z);
        AddVec.multiplyScalar(Distance);
        this.position.add(AddVec);

    }

    rotateU(deg){
       this.H.applyAxisAngle(this.U,deg*Math.PI/180);
       this.L.applyAxisAngle(this.U,deg*Math.PI/180);
       this.H.normalize();
       this.L.normalize();
    }
    rotateL(deg){
      this.H.applyAxisAngle(this.L,deg*Math.PI/180);
      this.U.applyAxisAngle(this.L,deg*Math.PI/180);
      this.H.normalize();
      this.U.normalize();

    }
    rotateH(deg){
      this.U.applyAxisAngle(this.H,deg*Math.PI/180);
      this.L.applyAxisAngle(this.H,deg*Math.PI/180);
      this.U.normalize();
      this.L.normalize();

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
