import ParametricTree from './ParametricTree';

class Leaf extends ParametricTree{
    constructor(Iter){
        super(Iter);
    }
    developString(){
        this.STR = "[A][B]";
        var temp = "";
        for(var i = 0; i <= this.Iterations; i+=1){
            for (var k = 0; k < this.STR.length; k+=1){
                switch (this.STR[k]) {
                    case 'A':
                      temp = temp + "[+A{.].C.}";
                    break;
                    case 'B':
                        temp = temp + "[-B{.].C.}";
                    break;
                    case 'C':
                        temp = temp + "GC";
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
