import RedCircle from "../RedCircle";
import rand from "../../Functions/rand";
import BlueCircle from "../BlueCircle";

function Bebras() {
        return <><h2>Hello { (rand (10, 20)) }, Bebre</h2>
      {(rand (0, 1)) ? <RedCircle /> : <BlueCircle /> }  </>   
        
}



export default Bebras ;
 