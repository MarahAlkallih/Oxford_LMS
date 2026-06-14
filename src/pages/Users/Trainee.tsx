import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetTraineeQuery } from "../../services/users/GetTrainees";

const formatValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "Not Provided";
  }

  return String(value);
};

export const TraineeInfo = () => {
  const { id } = useParams();
  const accountId = Number(id);

  const { data, isLoading } = useGetTraineeQuery({ accountId });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Trainee Information
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">First Name</Typography>
              <Typography>
                {formatValue(data?.account?.firstName)}
              </Typography>
            </Grid>

           <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Last Name</Typography>
              <Typography>
                {formatValue(data?.account?.lastName)}
              </Typography>
            </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Email</Typography>
              <Typography>
                {formatValue(data?.account?.email)}
              </Typography>
            </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Phone Number</Typography>
              <Typography>
                {formatValue(data?.account?.phoneNumber)}
              </Typography>
            </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Gender</Typography>
              <Typography>
                {formatValue(data?.account?.gender)}
              </Typography>
            </Grid>

           <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Birth Date</Typography>
              <Typography>
                {formatValue(data?.account?.birthDate)}
              </Typography>
            </Grid>

           <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Language</Typography>
              <Typography>
                {formatValue(data?.account?.language?.name)}
              </Typography>
            </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">About Me</Typography>
              <Typography>
                {formatValue(data?.account?.aboutMe)}
              </Typography>
            </Grid>

           <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Google ID</Typography>
              <Typography>
                {formatValue(data?.googleId)}
              </Typography>
            </Grid>

           <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Profile URL</Typography>
              <Typography>
                {formatValue(data?.url)}
              </Typography>
            </Grid>

           <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Created At</Typography>
              <Typography>
                {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : "Not Provided"}
              </Typography>
            </Grid>

           <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2">Updated At</Typography>
              <Typography>
                {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : "Not Provided"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};