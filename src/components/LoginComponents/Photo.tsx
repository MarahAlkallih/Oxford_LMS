import oxford from "../../assets/oxford.png"
export const Photo=()=>{
    return (
           <main
      className="relative w-[740px] h-[813px]"
      aria-label="image preview"
    >
      <img
        className="absolute top-0 right-0 w-[540px] h-[713px] z-0"
        alt="Mask group"
        src={oxford}
      />
    </main>
    )
}