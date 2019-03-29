import SimpleTree from './SimpleTree';
class PineTree extends SimpleTree{
    constructor(Iter){
        super(Iter);
    }
    developString(){
        this.STR = "VZFFFF";
        var temp = "";
        for(var itr = 1; itr<=this.Iterations; itr+=1){
          for (var k = 0; k < this.STR.length; k+=1) {
            switch (this.STR[k]){
                case 'V':
                    temp = temp + "[+++W][---W]YV";
                    break;
                case 'W':
                    temp = temp + "+X[-W]Z";
                    break;
                case 'X':
                    temp = temp + "-W[+X]Z";
                    break;
                case 'Y':
                    temp = temp + "YZ";
                    break;
                case 'Z':
                    temp = temp + "[-FFF][+FFF]F";
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
export default PineTree;
