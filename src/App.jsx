import React, { useState } from "react";
import {
  Container, Typography, Box, Button, Paper, AppBar, Toolbar,
  Grid, TextField, Card, CardContent, useTheme, useMediaQuery,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import WaterQualityIndicator from "./components/WaterQualityIndicator";

// ================== CONSTANTS ==================
const LOGOS = [
  {
    src: "https://upload.wikimedia.org/wikipedia/en/2/2d/Indian_Institute_of_Technology_Roorkee_Logo.svg",
    alt: "IIT Roorkee",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuE0PV0-hNr7LPji3WbzltjAG6WRYbPKHYQQ&s",
    alt: "WRD&M IITR",
  },
  {
    src: "https://media.licdn.com/dms/image/v2/D4D0BAQFyid74E8Exdw/company-logo_200_200/company-logo_200_200/0/1723616687141?e=2147483647&v=beta&t=5ES6iUoSwlG0tJlVKkbPT8TjkZICAvQih1MBVZ1kcfE",
    alt: "DAP IITR",
  },
];

const INITIAL_INDICATORS = {
  waterQuality: 0,
  waterQualityTwo: 0,
  waterQualityThree: 0,
  waterQualityFour: 0,
  waterQualityFive: 0,
  qualityWaterSystemOne: 0,
  qualityWaterSystemTwo: 0,
  qualityWaterSystemThree: 0,
  qualityWaterSystemFour: 0,
  qualityWaterSystemFive: 0,
  qualityWaterSystemSix: 0,
  qualityWaterSystemSeven: 0,
  easeDrinkingWaterOne: 0,
  easeDrinkingWaterTwo: 0,
  easeDrinkingWaterThree: 0,
  easeDrinkingWaterFour: 0,
  easeDrinkingWaterFive: 0,
  easeDrinkingWaterSix: 0,
  quantityOfWaterSystem: 0,
  easeToBuyDrinkingWater: 0,
  affordabilityFactor: 0,
  affordabilityFactorOne: 0,
  affordabilityFactorTwo: 0,
  affordabilityFactorThree: 0,
  affordabilityFactorFour: 0,
  affordabilityFactorFive: 0,
};

const INITIAL_EXPERT = { name: "", experience: "", email: "", expertise: "" };

const indicatorConfig = [
  { name: "waterQuality", left: "Water Quality", right: "Quantity of Water System" },
  { name: "quantityOfWaterSystem", left: "Water Quality", right: "Ease to Buy Drinking Water (Bottle/Packet)" },
  { name: "easeToBuyDrinkingWater", left: "Water Quality", right: "Affordability Factor" },
  { name: "waterQualityTwo", left: "Water Quality", right: "Water Security" },
  { name: "waterQualityThree", left: "Water Quality", right: "Cleaning Around Drinking Water Area" },
  { name: "waterQualityFour", left: "Water Quality", right: "Availability of Cleaning Team/Workers" },
  { name: "waterQualityFive", left: "Water Quality", right: "Complaint Regarding Water and Cleanness" },
  { name: "qualityWaterSystemOne", left: "Quantity of Water System", right: "Ease to Buy Drinking Water (Bottle/Packet)" },
  { name: "qualityWaterSystemTwo", left: "Quantity of Water System", right: "Affordability Factor" },
  { name: "qualityWaterSystemThree", left: "Quantity of Water System", right: "Water Security" },
  { name: "qualityWaterSystemFour", left: "Quantity of Water System", right: "Cleaning Around Drinking Water Area" },
  { name: "qualityWaterSystemFive", left: "Quantity of Water System", right: "Cleaning Frequency" },
  { name: "qualityWaterSystemSix", left: "Quantity of Water System", right: "Availability of Cleaning Team/Workers" },
  { name: "qualityWaterSystemSeven", left: "Quantity of Water System", right: "Complaint Regarding Water and Cleanness" },
  { name: "easeDrinkingWaterOne", left: "Ease to Buy Drinking Water (Bottle/Packet)", right: "Affordability Factor" },
  { name: "easeDrinkingWaterTwo", left: "Ease to Buy Drinking Water (Bottle/Packet)", right: "Water Security" },
  { name: "easeDrinkingWaterThree", left: "Ease to Buy Drinking Water (Bottle/Packet)", right: "Complaint Regarding Water and Cleanness" },
  { name: "easeDrinkingWaterFour", left: "Ease to Buy Drinking Water (Bottle/Packet)", right: "Cleaning Around Drinking Water Area" },
  { name: "easeDrinkingWaterFive", left: "Ease to Buy Drinking Water (Bottle/Packet)", right: "Cleanness Frequency" },
  { name: "easeDrinkingWaterSix", left: "Ease to Buy Drinking Water (Bottle/Packet)", right: "Availability of Cleaning Team/Workers" },
  { name: "affordabilityFactorOne", left: "Affordability Factor", right: "Water Security" },
  { name: "affordabilityFactorTwo", left: "Affordability Factor", right: "Cleaning Around Drinking Water Area" },
  { name: "affordabilityFactorThree", left: "Affordability Factor", right: "Cleanness Frequency" },
  { name: "affordabilityFactorFour", left: "Affordability Factor", right: "Availability of Cleaning Team/Workers" },
  { name: "affordabilityFactorFive", left: "Affordability Factor", right: "Complaint Regarding Water and Cleanness" },
  { name: "waterSecurityOne", left: "Water Security", right: "Cleaning Around Drinking Water Area" },
  { name: "waterSecurityTwo", left: "Water Security", right: "Cleanness Frequency" },
  { name: "waterSecurityThree", left: "Water Security", right: "Availability of Cleaning Team/Workers" },
  { name: "waterSecurityFour", left: "Water Security", right: "Complaint Regarding Water and Cleanness" },
  { name: "cleaningAroundDrinkingWaterOne", left: "Cleaning Around Drinking Water Area", right: "Cleanness Frequency" },
  { name: "cleaningAroundDrinkingWaterTwo", left: "Cleaning Around Drinking Water Area", right: "Availability of Cleaning Team/Workers" },
  { name: "cleaningAroundDrinkingWaterThree", left: "Cleaning Around Drinking Water Area", right: "Complaint Regarding Water and Cleanness" },
  { name: "cleannessFrequencyOne", left: "Cleanness Frequency", right: "Availability of Cleaning Team/Workers" },
  { name: "cleannessFrequencyTwo", left: "Cleanness Frequency", right: "Complaint Regarding Water and Cleanness" },
  { name: "availabilityCleaning", left: "Availability of Cleaning Team/Workers", right: "Complaint Regarding Water and Cleanness" },
];

// ================== COMPONENT ==================
const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [indicators, setIndicators] = useState(INITIAL_INDICATORS);
  const [expertDetails, setExpertDetails] = useState(INITIAL_EXPERT);
  const [errors, setErrors] = useState({});

  // ----------- Handlers -----------
  const handleIndicatorChange = (name, value) =>
    setIndicators((prev) => ({ ...prev, [name]: value }));

  const handleExpertChange = (field, value) => {
    setExpertDetails((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, experience } = expertDetails;

    if (!experience || experience < 0)
      newErrors.experience = "Experience must be a positive number.";
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address.";
    if (name && !/^[a-zA-Z\s]+$/.test(name))
      newErrors.name = "Name can only contain letters and spaces.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return toast.error("Please fix form errors first.");

    if (!Object.values(indicators).some((v) => v !== 0))
      return toast.warning("Adjust at least one indicator before submitting.");

    try {
      const formatted = Object.fromEntries(
        Object.entries(indicators).map(([key, val]) => [
          key,
          val === 0
            ? { moderate: 0 }
            : val > 0
              ? { good: val }
              : { notGood: Math.abs(val) },
        ])
      );

      const payload = {
        ...expertDetails,
        submission_date: new Date().toLocaleString(),
        indicators: formatted,
      };

      const res = await emailjs.send(
        "service_6ntd6lb",
        "template_ofd6ufq",
        { message: JSON.stringify(payload, null, 4) },
        "DEcnL1UogEkzIdR_k"
      );

      if (res.status === 200) {
        toast.success("Thank you! Response submitted successfully.");
        setIndicators(INITIAL_INDICATORS);
        setExpertDetails(INITIAL_EXPERT);
      }
    } catch (err) {
      console.error("Email sending failed:", err);
      toast.error("Submission failed. Please try again later.");
    }
  };

  const resetAll = () => {
    setIndicators(INITIAL_INDICATORS);
    toast.info("All indicators reset to zero.");
  };

  // ----------- Render -----------
  return (
    <Box sx={{ minHeight: "100vh", width: "100%", bgcolor: "#f5f5f5" }}>
      <ToastContainer position={isMobile ? "top-center" : "top-right"} />

      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "#248af0ff" }}>
        <Toolbar sx={{ justifyContent: "center", flexWrap: "wrap" }}>
          {LOGOS.map(({ src, alt }) => (
            <img key={alt} src={src} alt={alt} height={isMobile ? 30 : 40} style={{ margin: "0 8px" }} />
          ))}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Intro Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Analytic Hierarchy Process (AHP) Survey
          </Typography>

          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              color: "#2196f3",
              mb: 3,
              fontWeight: "600",
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
            }}
          >
            Drinking Water and Sanitation Indices - Panchkoshi Marg, Varanasi
          </Typography>

          {/* Information Section */}
          <Card sx={{ mb: 3, textAlign: "left", backgroundColor: "#f8f9fa" }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                <strong>Indian Institute of Technology Roorkee</strong>
                <br />
                <strong>
                  Department of Water Resources Development and Management
                  (WRD&M)
                </strong>
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                <strong>Dear WASH Expert,</strong>
                <br />
                <br />I am{" "}
                <strong>Harsh Pathak (Enrollment No. 24571001)</strong>, a
                2nd-year M.Tech student in Drinking Water and Sanitation (DWS)
                at the Department of Water Resources Development and Management,
                IIT Roorkee. As part of my thesis titled{" "}
                <strong>
                  "Integrated Drinking Water and Sanitation for the Pilgrim
                  City: A Case Study of Panchkoshi Marg, Varanasi,"
                </strong>{" "}
                I am developing a Drinking Water Index (DWI) and Sanitation
                Index (SI) to assess and prioritize improvements in water and
                sanitation facilities along this sacred pilgrimage route.
              </Typography>

              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                gutterBottom
                sx={{ color: "#2196f3", mt: 2, fontWeight: 'bold' }}
              >
                Importance of This Survey:
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                This research aims to enhance access to safe drinking water and
                sanitation for millions of pilgrims, addressing challenges like
                seasonal crowds, hygiene, and infrastructure in culturally
                significant areas. Your expertise will help assign accurate
                weights to key indicators, contributing to sustainable
                development goals (SDGs 6: Clean Water and Sanitation) and
                better policy recommendations for pilgrim cities.
              </Typography>

              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                gutterBottom
                sx={{ color: "#2196f3", fontWeight: 'bold' }}
              >
                What is AHP?
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                The Analytic Hierarchy Process (AHP), developed by Thomas L.
                Saaty, is a multi-criteria decision-making method that uses
                pairwise comparisons to derive relative weights for indicators.
                It combines qualitative judgments with quantitative analysis to
                handle complex decisions systematically.
              </Typography>

              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                gutterBottom
                sx={{ color: "#2196f3", fontWeight: 'bold' }}
              >
                Why AHP in This Study?
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                AHP allows us to prioritize indicators based on expert opinions,
                ensuring the indices reflect real-world importance in a pilgrim
                context (e.g., high footfall, religious sensitivities). This
                will guide targeted interventions for Varanasi's Panchkoshi
                Marg.
              </Typography>

              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                gutterBottom
                sx={{ color: "#2196f3", fontWeight: 'bold' }}
              >
                How to Fill This Form:
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                <Box component="ul" sx={{ pl: { xs: 2, sm: 3 } }}>
                  <li>
                    Compare indicators pairwise within each index (Drinking
                    Water and Sanitation separately).
                  </li>
                  <li>
                    For each pair (e.g., "Water Quality vs. Quantity of Water
                    System"), select one value from the scale by clicking the
                    circle.
                  </li>
                  <li>
                    <strong>Scale (bipolar, from 5' to 5):</strong>
                    <Box component="ul" sx={{ pl: { xs: 2, sm: 3 } }}>
                      <li><strong>5':</strong> Second indicator is extremely more important.</li>
                      <li><strong>4':</strong> Strongly more important.</li>
                      <li><strong>3':</strong> Moderately more important.</li>
                      <li><strong>2':</strong> Weakly more important.</li>
                      <li><strong>1':</strong> Slightly more important.</li>
                      <li><strong>0:</strong> Equal importance.</li>
                      <li><strong>1:</strong> First indicator is slightly more important.</li>
                      <li><strong>2:</strong> Weakly more important.</li>
                      <li><strong>3:</strong> Moderately more important.</li>
                      <li><strong>4:</strong> Strongly more important.</li>
                      <li><strong>5:</strong> Extremely more important.</li>
                    </Box>
                  </li>
                  <li>
                    Base comparisons on your WASH expertise, considering pilgrim
                    cities' unique needs.
                  </li>
                  <li>
                    There are 36 pairs per index (72 total); ~20-30 minutes to
                    complete.
                  </li>
                  <li>
                    Submit the form, and responses will be emailed to
                    harsh_p@wr.iitr.ac.in.
                  </li>
                  <li>
                    Responses are anonymized and used solely for academic
                    purposes.
                  </li>
                  <li>If unclear, select 0 or add comments.</li>
                </Box>
              </Typography>
            </CardContent>
          </Card>

          <Typography
            variant="body1"
            sx={{
              color: "#7f8c8d",
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.6,
              mt: 3,
            }}
          >
            Adjust the sliders to rate each water quality factor.
            <br />
            Colors intensify as you move away from center.
          </Typography>
        </Paper>

        {/* Expert Details */}
        <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 3 }}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" color="#2c3e50" mb={2}>
            Expert Details
          </Typography>

          <Grid container spacing={2}>
            {[
              { label: "Name/Organization", name: "name" },
              { label: "Years of Experience in WASH", name: "experience", type: "number", required: true },
              { label: "Email", name: "email", type: "email" },
              { label: "Field of Expertise", name: "expertise" },
            ].map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  type={field.type || "text"}
                  required={field.required}
                  value={expertDetails[field.name]}
                  onChange={(e) => handleExpertChange(field.name, e.target.value)}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Indicators */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {indicatorConfig.map(({ name, left, right }) => (
            <WaterQualityIndicator
              key={name}
              leftImage="🚫"
              rightImage="✅"
              leftLabel={left}
              rightLabel={right}
              name={name}
              value={indicators[name]}
              onChange={handleIndicatorChange}
              isMobile={isMobile}
            />
          ))}
        </Box>

        {/* Buttons */}
        <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ px: 5, borderRadius: 2, fontWeight: "bold" }}
          >
            📊 Submit Assessment
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={resetAll}
            sx={{ px: 5, borderRadius: 2, fontWeight: "bold", borderColor: "#2196f3", color: "#2196f3" }}
          >
            🔄 Reset All Indicators
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 2, bgcolor: "#248af0ff", color: "white", textAlign: "center" }}>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Indian Institute of Technology Roorkee | Department of Water Resources
          Development and Management © 2025
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Contact: Harsh Pathak | harsh_p@wr.iitr.ac.in | Enrollment No.
          24571001
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
