import { Box } from "@mui/material";
import { StatCard } from "../../components/Statictis/StatCard";
import { CentersCard } from "../../components/Statictis/VenueMap";

export const Dashboard = () => {

  return (
    <Box sx={{ p: 3 }}>

      {/* Statistics */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          mb: 3,
        }}
      >
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
      </Box>

      {/* Map */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          p: 2,
          boxShadow: 1,
        }}
      >
        <h2>Courses by Venue</h2>

        <CentersCard centersData={[]}  />
      </Box>

    </Box>
  );
};