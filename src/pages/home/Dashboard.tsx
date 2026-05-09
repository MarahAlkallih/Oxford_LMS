import { Box, } from "@mui/material";

import { ConfirmModal } from "../../components/modals/ConfirmModal";
import { useState } from "react";
import { Button } from "../../components/Buttons/SubmitBtn";
export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  return (
  <Box>
      <Button name="Dashboard" onClick={() => setOpen(true)} />

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          console.log("deleted");
          setOpen(false);
        }}
      />
    </Box>
  );
};
