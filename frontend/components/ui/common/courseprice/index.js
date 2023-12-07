
//!Helpers methods
import convert from "utils/convert_eth";


//*CoursePrice
export default function CoursePrice({eth,course}){
    //return jsx to client
    return(
        <>
            <span className="font-bold"> &nbsp; {convert(eth,course)} </span>       
        </>
    )
}