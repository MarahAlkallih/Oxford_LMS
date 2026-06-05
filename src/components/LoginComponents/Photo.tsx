import oxford from "../../assets/oxford.png"
export const Photo=()=>{
    return (
           <main
      className="w-fit h-full object-cover"
      aria-label="image preview"
    >
      <img
        className="absolute top-0 right-0 width-fit h-full z-0"
        alt="Mask group"
        src={oxford}
      />
    </main>
    )
}