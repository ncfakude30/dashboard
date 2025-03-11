/**
=========================================================
* Tendler React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React & Redux imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../../store/redux/slices/profileSlice";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Tendler React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Tendler React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Overview() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    location: "",
  });

  // Fetch user profile on mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Set form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        mobile: user.mobile || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateProfile(formData));
    setEditable(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: formData.fullName,
                  mobile: formData.mobile,
                  email: formData.email,
                  location: formData.location,
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ tooltip: "Edit Profile", onClick: () => setEditable(true) }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
            </Grid>
          </Grid>
        </MDBox>

        {/* Edit Profile Section */}
        {editable && (
          <MDBox p={3}>
            <TextField
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="mobile"
              label="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Save
            </Button>
          </MDBox>
        )}
      </Header>

      {/* Projects Section */}
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium">
          Projects
        </MDTypography>
        <MDBox mb={1}>
          <MDTypography variant="button" color="text">
            Architects design houses
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor1}
              label="project #2"
              title="modern"
              description="As Uber works through a huge amount of internal management turmoil."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team1, name: "Elena Morison" },
                { image: team2, name: "Ryan Milly" },
                { image: team3, name: "Nick Daniel" },
                { image: team4, name: "Peterson" },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <DefaultProjectCard
              image={homeDecor2}
              label="project #1"
              title="scandinavian"
              description="Music is something that everyone has their own specific opinion about."
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }}
              authors={[
                { image: team3, name: "Nick Daniel" },
                { image: team4, name: "Peterson" },
                { image: team1, name: "Elena Morison" },
                { image: team2, name: "Ryan Milly" },
              ]}
            />
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
