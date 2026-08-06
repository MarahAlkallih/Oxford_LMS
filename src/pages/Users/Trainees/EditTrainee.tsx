import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { useGetTraineeQuery, useUpdateTraineeMutation } from "../../../services/users/GetTrainees";
import { toast } from "react-toastify";
import { ErrorHandler } from "../../../utils/ErrorHandler";

export const EditTrainee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accountId = Number(id);

  const { data: traineeData, isLoading: isFetching } = useGetTraineeQuery({ accountId });

  const [updateTrainee, { isLoading: isUpdating }] = useUpdateTraineeMutation();


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    gender: "MALE",
    languageId: 1,
    url: "",
    googleId: "",
    aboutMe: "",
    birthDate: "",
  });

 
  const formatDateForInput = (dateString?: string | null) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; 
  };


  useEffect(() => {
    if (traineeData) {
      const account = traineeData.account;
      setFormData({
        firstName: account?.firstName || "",
        lastName: account?.lastName || "",
        userName: account?.userName || "",
        phoneNumber: account?.phoneNumber || "",
        gender: account?.gender || "MALE",
        languageId: account?.languageId || 1,
        url: traineeData?.url || "",
        googleId: traineeData?.googleId || "",
        aboutMe: account?.aboutMe || "",
        birthDate: formatDateForInput(account?.birthDate) ,
      });
    }
  }, [traineeData]);

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();


  const formattedBirthDate = formData.birthDate 
    ? `${formData.birthDate}T00:00:00.000Z` 
    : null;

  const payload = {
    ...formData,
    languageId: Number(formData.languageId),
    birthDate: formattedBirthDate, 
    googleId: formData.googleId || null,
    url: formData.url || null,
  };

  try {
    await updateTrainee({ id:accountId, body: payload }).unwrap();
    toast.success("Trainee profile updated successfully")
    navigate(-1);
  } catch (error) {
    ErrorHandler.show(error)
  }
};
  if (isFetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 900, margin: "auto" }}>
      
 
      <Stack direction="row" sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          startIcon={<ArrowBackIosNewOutlinedIcon sx={{ fontSize: 14 }} />}
          onClick={() => navigate(-1)}
          variant="text"
          sx={{ color: "text.secondary", textTransform: "none" }}
        >
          Cancel and go back
        </Button>
      </Stack>

      <Card sx={{ borderRadius: 4,bgcolor:"#f8f5df", border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Edit Trainee Profile
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Update personal settings and account credentials below.
          </Typography>

          {/* بدء الفورم */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              
              {/* حقل الإيميل (للعرض فقط ومقفل لأن الباك إند لا يقبله في التعديل) */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Email Address (Cannot be changed)"
                  value={traineeData?.account?.email || ""}
                  fullWidth
                  disabled
                  helperText="Account email identities are managed globally."
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  label="Language"
                  name="languageId"
                  value={formData.languageId}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value={1}>English</MenuItem>
                  <MenuItem value={2}>Arabic</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Profile Website / URL"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Google ID Connection"
                  name="googleId"
                  value={formData.googleId}
                  onChange={handleChange}
                  fullWidth
                  placeholder="e.g. 123456789"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="About Me / Bio"
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Write a brief bio about the trainee..."
                />
              </Grid>

              {/* أزرار الحفظ والإلغاء */}
              <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }} className="flex justify-end gap-3">
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => navigate(-1)}
                    disabled={isUpdating}
                    sx={{ borderRadius: 2.5, textTransform: "none" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isUpdating}
                    startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : <SaveOutlinedIcon />}
                    sx={{ borderRadius: 2.5, textTransform: "none", px: 4, backgroundColor: "#4B5945" }}
                  >
                    {isUpdating ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </Stack>
              </Grid>

            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};