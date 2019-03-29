import * as THREE from 'three';
import TwoPointBox from './TwoPointBox';
import Node from './Node';
class SimpleTree{
    constructor(Iter) {
        this.Iterations = Iter;
    }
    developString(){
        this.STR = "X";
        var temp = "";
        for(var itr = 1; itr<=this.Iterations; itr+=1){
          for (var k = 0; k < this.STR.length; k+=1) {
            switch (this.STR[k]){
              case 'F':
                temp = temp + "FF";
                break;
              case 'X':
                temp = temp + "F-[[X]+X]+F[+FX]-X";
                break;
              default:
                temp = temp + this.STR[k];
                break;
            }
          }
          this.STR = temp;
          temp = "";
        }
    }
    createMesh(SP){
        this.developString();
        var Stack = []
        var Box;
        var temp = SP;
        var StackTemp;
        var child;
        var Dist = 1;
        var Rotation = 22.5*Math.PI/180;
        var Rotation2 = 50*Math.PI/180;
        var group = new THREE.Group();
        for (var k = 0; k < this.STR.length; k+=1){
            //console.log(this.STR.charAt(k));
            switch(this.STR.charAt(k)){
                case 'F':
                    child = temp.moveForward(Dist);
                    Box = new TwoPointBox(temp.position,child.position,0.25);
                    group.add(Box.CreateMesh());
                    temp = child;
                break;
                case '-':
                    temp.rotate(2,-1*Rotation);
                    Rotation2 = Rotation2/2;
                break;
                case '+':
                    temp.rotate(1, Rotation2);
                    Rotation2 = Rotation2/2;
                break;
                case '|':
                    temp.rotate(2,Math.PI);
                break;
                case '[':
                    StackTemp = new Node(temp.position.x,temp.position.y,temp.position.z,temp.direction);
                    Stack.push(StackTemp);
                break;
                case ']':
                    temp = Stack.pop();
                break;
                default:
                break;
            }
        }
        return group;
    }

}
export default SimpleTree
