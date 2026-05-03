import type { Btn } from "../../types/submitBtn"

export const Button=({name,onClick: onClick}:Btn)=>{
    return(
        <div className="w-[200px] h-[50px] ">
            <button onClick={onClick} className="w-full  p-2 bg-[#4B5945]  rounded text-amber-50  cursor-pointer">
             {name}
            </button>

        </div>

    )
}