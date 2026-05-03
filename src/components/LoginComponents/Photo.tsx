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
      
      <div
        className="absolute top-0 right-0 w-[540px] h-[713px] bg-gradient-to-b from-[rgba(176,200,189,0.55)] to-[rgba(87,108,86,0.55)] rounded-[301px_0px_0px_0px] z-10"
        aria-hidden="true"
      />
    </main>
    )
}