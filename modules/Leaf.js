import ParametricTree from './ParametricTree';

class Leaf extends ParametricTree{
    constructor(Iter, LD, InitialLength){
        super(Iter);
        this.LD = LD;
        this.InitialLength = InitialLength
    }
    developString(){
        this.STR = "[A("+this.InitialLength+",0)][B("+this.InitialLength+",0)]";
        var temp = "";
        var tempVal="";
        var Value;
        for(var i = 0; i <= this.Iterations; i+=1){
            for (var k = 0; k < this.STR.length; k+=1){
                switch (this.STR[k]) {
                    case 'A':
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
                            temp = temp + "{*[[+("+((Value[1])*180/this.Iterations)+")G("+Value[0]+")*]+("+((Value[1]+1)*180/this.Iterations)+")G("+Value[0]*this.LD+")*]}A("+Value[0]*this.LD+","+(Value[1]+1)+")";
                        }
                    break;
                    case 'B':
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
                            temp = temp + "{*[[-("+((Value[1])*180/this.Iterations)+")G("+Value[0]+")*]-("+((Value[1]+1)*180/this.Iterations)+")G("+Value[0]*this.LD+")*]}B("+Value[0]*this.LD+","+(Value[1]+1)+")";

                        }
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
}
export default Leaf
