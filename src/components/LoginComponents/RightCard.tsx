
import type { ReactNode } from "react";
import cir from "../../assets/c-1.png"
import cir2 from "../../assets/c-2.png"
import { Box as MuiBox } from "@mui/material";
interface RightCardProps {
  children?: ReactNode;
}

export const RightCard=({ children }: RightCardProps)=>{
    return(
        <MuiBox
      sx={{
        position: "relative",
        width: {
          xs: "92%",
          sm: "80%",
          md: "min(460px, 92%)",
          lg: "min(520px, 90%)",
        },
        minHeight: {
          xs: 260,
          sm: 300,
          md: 340,
        },
        borderRadius: "24px",
        background: `
            linear-gradient(
              rgba(175,175,175,0.2),
              rgba(220,220,220,0.6)
            )
          `,

          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",

          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}
    >
   
      <MuiBox
        component="img"
        src={cir2}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
         // width: { xs: 160, sm: 200, md: 240 },
          transform: "rotate(0deg)", // نفس الزاوية
          opacity: 0.9,
        }}
      />
      <MuiBox
        component="img"
        src={cir}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
        //  width: { xs: 160, sm: 200, md: 240 },
          transform: "rotate(0deg)", // نفس الزاوية (مهم)
          opacity: 0.9,
          
        }}
      />

 <MuiBox
  sx={{
    position: "relative",
    zIndex: 2,
    width: "100%",
    height: "100%",
    p: { xs: 2.5, sm: 3, md: 4 },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  }}
>
  {children}
</MuiBox>

      {/* الكارد */}
      {/* <MuiBox
        sx={{
          position: "relative",
          zIndex: 2,
          width: 40,
          mx: "auto",
          mt: "10%",
          p: 4,
          borderRadius: "20px",

          background: `
            linear-gradient(
              rgba(175,175,175,0.2),
              rgba(220,220,220,0.6)
            )
          `,

          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",

          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        
      </MuiBox> */}
    </MuiBox>
    )
}