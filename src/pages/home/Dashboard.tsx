import { Box, Card, CardContent, Grid, Typography } from "@mui/material";


export const Dashboard = () => {
  return (
    <Box>
      {/* <Typography sx={{ fontSize: "32px", fontWeight: "bold", mb: 4, color: "#333" }}>
        Dashboard
      </Typography> */}

      {/* Stats Grid */}
      {/* <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={SchoolIcon}
            title="Active Courses"
            value="12"
            color="#4B5945"
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={AssignmentIcon}
            title="Assignments"
            value="28"
            color="#66785F"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={PeopleIcon} title="Students" value="145" color="#91AC8F" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={TrendingUpIcon}
            title="Completion Rate"
            value="78%"
            color="#B0C8BD"
          />
        </Grid>
      </Grid> */}

      {/* Recent Activity */}
      {/* <Card sx={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <CardContent>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
            Recent Activity
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[1, 2, 3].map((item) => (
              <Box
                key={item}
                sx={{
                  p: 2,
                  background: "#f9f9f9",
                  borderRadius: "8px",
                  borderLeft: "4px solid #4B5945",
                }}
              >
                <Typography sx={{ fontWeight: "500", mb: 0.5 }}>
                  Student submitted assignment
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "#999" }}>
                  2 hours ago
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>*/}
    </Box> 
  );
};
