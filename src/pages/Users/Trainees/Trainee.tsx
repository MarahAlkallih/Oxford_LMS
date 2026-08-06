import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Avatar,
  Chip,
  Button,
  Stack,
  Skeleton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTraineeQuery } from "../../../services/users/GetTrainees";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const formatValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "Not Provided";
  }
  return String(value);
};

export const TraineeInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accountId = Number(id);

  const { data, isLoading } = useGetTraineeQuery({ accountId });


  const getInitials = (first?: string, last?: string) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase();
  };

  // هيكل تحميل وهمي احترافي (Skeleton)
  if (isLoading) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, margin: "auto" }}>
        <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 4, mb: 3 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}><Skeleton variant="rectangular" height={300} sx={{ borderRadius: 4 }} /></Grid>
          <Grid size={{ xs: 12, md: 8 }}><Skeleton variant="rectangular" height={300} sx={{ borderRadius: 4 }} /></Grid>
        </Grid>
      </Box>
    );
  }

  const account = data?.account;
  const fullName = `${account?.firstName || ""} ${account?.lastName || ""}`;

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "auto" }}>
      
      {/* هيدر الصفحة وأزرار التحكم */}
      <Stack direction="row" sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }} className="flex justify-between items-center">
        <Button
          startIcon={<ArrowBackIosNewOutlinedIcon sx={{ fontSize: 14 }} />}
          onClick={() => navigate(-1)}
          variant="text"
          sx={{ color: "text.secondary", textTransform: "none" }}
        >
          Back to list
        </Button>
        
        {/* زر التعديل ينقلك إلى راوت التعديل الخاص بهذا المتدرب */}
        <Button
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={() => navigate(`edit`)} // أو حسب الراوت لديكِ: `/trainees/${id}/edit`
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
            boxShadow: "none",
            backgroundColor:"#4B5945",
            "&:hover": { boxShadow: "none" }
          }}
        >
          Edit Profile
        </Button>
      </Stack>

      <Grid container spacing={3}>
        
        {/* الكارد الجانبي: الصورة الشخصية والحالة العامة */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 4, bgcolor: "#7f9676", border: "2px solid", borderColor: "divider", boxShadow: "none", textAlign: "center", p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  w: 84,
                  h: 84,
                  width: 84,
                  height: 84,
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  bgcolor: "#4B5945",
                  color: "secoundry.light",
                  border: "4px solid",
                  borderColor: "grey.100"
                }}
              >
                {getInitials(account?.firstName, account?.lastName)}
              </Avatar>
              
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                  {fullName}
                </Typography>
                <Typography variant="body2" sx={{fontWeight: "bold",color:"#f4f3ec"}}>
                  @{account?.userName || "username"}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  label={account?.isActive ? "Active Account" : "Inactive"}
                  color={account?.isActive ? "success" : "default"}
                  size="small"
                  sx={{ fontWeight: "600" }}
                />
                {data?.googleId && (
                  <Chip label="Google Connected" color="warning" variant="outlined" size="small" sx={{ fontWeight: "500" }} />
                )}
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: "left", spaceY: 2 }} className="space-y-3">
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: "bold" }}>
                BIO / ABOUT ME
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ fontStyle: account?.aboutMe ? "normal" : "italic" }}>
                {formatValue(account?.aboutMe)}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* الكارد الرئيسي: تفاصيل البيانات مقسمة بشكل مريح للعين */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 4,bgcolor:"#f8f5df" ,border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
            <CardContent sx={{ p: 4 }}>
              
              {/* القسم الأول: البيانات الشخصية */}
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1, mb: 2, color: "#4B5945" }}>
                <AdminPanelSettingsOutlinedIcon fontSize="small" /> Personal Information
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>First Name</Typography>
                  <Typography variant="body1" sx={{ mt: 0.5, textTransform: "capitalize" }}>{formatValue(account?.firstName)}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>Last Name</Typography>
                  <Typography variant="body1" sx={{ mt: 0.5, textTransform: "capitalize" }}>{formatValue(account?.lastName)}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>Gender</Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>{formatValue(account?.gender)}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>Birth Date</Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {account?.birthDate ? new Date(account.birthDate).toLocaleDateString() : "Not Provided"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* القسم الثاني: بيانات الاتصال والتواصل */}
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1, mb: 2, color: "#4B5945" }}>
                <EmailOutlinedIcon fontSize="small" /> Contact & App Details
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>Email Address</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5, alignItems: "center" }}>
                    <EmailOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="body1">{formatValue(account?.email)}</Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>Phone Number</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5, alignItems: "center" }}>
                    <PhoneOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="body1">{formatValue(account?.phoneNumber)}</Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>Preferred Language</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5, alignItems: "center" }}>
                    <LanguageOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="body1">{formatValue(account?.languageName || account?.languageName)}</Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>Profile URL / Website</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5, alignItems: "center" }}>
                    <LinkOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="body1" color={data?.url ? "primary.main" : "text.primary"}>{formatValue(data?.url)}</Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* القسم الثالث: أوقات تحديث السجل وسجلات النظام */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>Joined Platform At</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5, alignItems: "center" }}>
                    <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="body2">{data?.createdAt ? new Date(data.createdAt).toLocaleString() : "Not Provided"}</Typography>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "600" }}>Last Profile Update</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5, alignItems: "center" }}>
                    <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="body2">{data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : "Not Provided"}</Typography>
                  </Stack>
                </Grid>
              </Grid>

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};