import * as THREE from 'three';
import TwoPointBox from './TwoPointBox';
import TwoPointCylinder from './TwoPointCylinder';
import HLUNode from './HLUNode';
import Polygon from './Polygon';

class ParametricTree{
    constructor(Iter) {
        this.Iterations = Iter;
        this.STR = "";

    }
    developString(){
        var r1 = 0.9;
        var r2 = 0.6;
        var a0 = 45;
        var a2 = 45;
        var d = 137.5;
        var wr = 0.707;

        this.STR = "A(10,1)";
        var tempVal = "";
        var tempStr = "";
        var Value = [];
        for(var i = 0; i <= this.Iterations; i+=1){
            for (var k = 0; k < this.STR.length; k+=1){
                tempVal="";
                if(this.STR[k] == 'A'){
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        Value = tempVal.split(',').map(function(x){
                            return parseFloat(x);
                        });
                        tempVal="";
                        //console.log("A(" + Value[0] + " , " + Value[1] + "): * ->  " + "!(" + Value[1] + ")F("+ Value[0]+")[&("+a0+")B("+Value[0]*r2+"," + Value[1]*wr+")]/("+d+")A("+Value[0]*r1+","+Value[1]*wr+")");
                        tempStr = tempStr + "!(" + Value[1] + ")F("+ Value[0]+")[&("+a0+")B("+Value[0]*r2+"," + Value[1]*wr+")]/("+d+")A("+Value[0]*r1+","+Value[1]*wr+")";
                    }
                }
                else if(this.STR[k] == 'B'){
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        Value = tempVal.split(',').map(function(x){
                            return parseFloat(x);
                        });
                        tempVal="";
                        //console.log("B(" + Value[0] + " , " + Value[1] + "): * ->  " + "!(" + Value[1] + ")F("+ Value[0]+")[-("+a2+")$C("+Value[0]*r2+"," + Value[1]*wr+")]C("+Value[0]*r1+","+Value[1]*wr+")");
                        tempStr = tempStr + "!(" + Value[1] + ")F("+ Value[0]+")[-("+a2+")$C("+Value[0]*r2+"," + Value[1]*wr+")]C("+Value[0]*r1+","+Value[1]*wr+")";
                    }
                }
                else if(this.STR[k] == 'C'){
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        Value = tempVal.split(',').map(function(x){
                            return parseFloat(x);
                        });
                        tempVal="";
                        tempStr = tempStr + "!(" + Value[1] + ")F("+ Value[0]+")[+("+a2+")$B("+Value[0]*r2+"," + Value[1]*wr+")]B("+Value[0]*r1+","+Value[1]*wr+")";
                    }
                }
                else{
                    tempStr = tempStr + this.STR[k];
                }
            }

            this.STR = tempStr;
            tempStr ="";
        }
    }
    createMesh(SP){
        this.developString();
        var Stack = [];
        var PolyStack = [];
        var Cylinder;
        var temp = SP;
        var tempVal;
        var StackTemp;
        var PolyTemp = new Polygon();

        var child;
        var LineWidth = 1;
        var Segments = 32;
        var Geometry = new THREE.Geometry();
        var Leafs = new THREE.Geometry();
        var G_TEMP = new THREE.Geometry();
        var Def_Degree = 10;

        for (var k = 0; k < this.STR.length; k+=1){
            //console.log(this.STR.charAt(k));
            tempVal = "";
            switch(this.STR.charAt(k)){
                case 'F':
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                    }
                    child = temp.moveForward(parseFloat(tempVal), LineWidth);
                    Cylinder = new TwoPointCylinder(temp.position,child.position, temp.Width, child.Width, Segments);
                    G_TEMP = Cylinder.CreateMesh()
                    //G_TEMP.updateMatrix();
                    Geometry.merge(G_TEMP);
                    temp = child;
                break;
                case 'G':
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        Value = tempVal.split(',').map(function(x){
                            return parseFloat(x);
                        });
                        temp.moveThisForward(Value[0]);
                    }
                    else{
                        temp.moveThisForward(2);
                    }

                break;
                case '+':
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        temp.rotateU(parseFloat(tempVal));
                    }
                    else{
                        temp.rotateU(Def_Degree);
                    }


                break;
                case '-':
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        temp.rotateU(-1*parseFloat(tempVal));
                    }
                    else{
                        temp.rotateU(-1*Def_Degree);
                    }

                break;
                case '&':
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        temp.rotateL(parseFloat(tempVal));
                    }
                    else{
                        temp.rotateL(Def_Degree);
                    }

                break;
                case '^':
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        temp.rotateL(-1*parseFloat(tempVal));
                    }
                    else{
                        temp.rotateL(-1*Def_Degree);
                    }

                break;
                case '\\':
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        temp.rotateH(parseFloat(tempVal));
                    }
                    else{
                        temp.rotateH(Def_Degree)
                    }

                break;
                case '/':
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        temp.rotateH(-1*parseFloat(tempVal));
                    }
                    else{
                        temp.rotateH(-1*Def_Degree);
                    }

                break;
                case '|':
                    temp.rotateL(180);
                break;
                case '!':
                    if(this.STR[k+1] == '('){
                        k+=2;
                        while(this.STR[k] != ')'){
                            tempVal += this.STR[k];
                            k++;
                        }
                        LineWidth = parseFloat(tempVal);
                    }
                break;
                case '[':
                    StackTemp = new HLUNode(temp.position.x,temp.position.y,temp.position.z, temp.Width);
                    StackTemp.H = temp.H;
                    StackTemp.L = temp.L;
                    StackTemp.U = temp.U;
                    Stack.push(StackTemp);
                break;
                case ']':
                    temp = Stack.pop();
                break;
                case '{':
                    PolyStack.push(PolyTemp);
                    PolyTemp = new Polygon();
                break;
                case'}':
                    G_TEMP = PolyTemp.buildGeometry();
                    Geometry.merge(G_TEMP);
                    PolyTemp = PolyStack.pop();
                break;
                case'.':
                    PolyTemp.push(temp.position);
                break;
                case '$':
                    temp.RollTurtle();
                break;
                default:
                break;
            }
        }
        return Geometry;
    }
}

export default ParametricTree
