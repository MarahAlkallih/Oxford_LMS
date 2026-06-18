import { EndForms } from "./EndForms"
import { StartForms } from "./StartForms"

export const FormsPage=()=>{
    return (
        <div>
            <div className="p-2">
               <StartForms/> 
               
            </div>
            <div className="p-2">
                 <EndForms /> 
            </div>
         
            </div>
    )
}