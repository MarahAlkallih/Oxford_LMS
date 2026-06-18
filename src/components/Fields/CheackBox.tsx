interface CheachBoxProps{
    checked:boolean,
    onChange:()=>void,
    label:string

}

export const CheckBox=({checked,onChange,label}:CheachBoxProps)=>{
    return(

          <div className="mt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange
              }
              className="w-5 h-5"
            />

            <span className="font-medium">
            {label}
            </span>
          </label>
        </div>
    )
}