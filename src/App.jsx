import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  TextField,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import WaterQualityIndicator from "./components/WaterQualityIndicator";
import waterQuality from "./assets/water-quality.png";
import quantityWaterSystem from "./assets/Quantity-Water-system.png";
import easetoBuyDrinking from "./assets/Ease-to-Buy-Drinking.png";
import affordabilityFactor from "./assets/Affordability-Factor.png";
import cleaningAroundDrinkingWater from "./assets/Cleaning-Around-drinking-water.png";
import waterSecurity from "./assets/Water-Security.png";
import cleaningFrequency from "./assets/cleaning-frequency.png";
import availabilityCleaningTeam from "./assets/availability-cleaning-team.png";
import numberToilet from "./assets/number-of-toilets.png";
import distanceToilet from "./assets/distance-tiolet.png";
import conditionToilet from "./assets/Condition-of-Toilet.png";
import cleaningToilet from "./assets/cleaning-toilet.png";
import SeparatedUniversalAccessible from "./assets/Separated-Universal-Accessible.png";
import SeparatedFemaleToilet from "./assets/Separated-Female-Toilet.png";
import dustbinAvailability from "./assets/Dustbin-Availability.png";
import complaintRegardingWater from "./assets/complaint-Regarding-water.png";
import stormWaterDrain from "./assets/Storm-Water-Drain.png";

// ================== CONSTANTS ==================
const LOGOS = [
  {
    src: "https://www.iitr.ac.in/indofrench/images/iitr_logo.png",
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
  waterSecurityOne: 0,
  waterSecurityTwo: 0,
  waterSecurityThree: 0,
  waterSecurityFour: 0,
  cleaningAroundDrinkingWaterOne: 0,
  cleaningAroundDrinkingWaterTwo: 0,
  cleaningAroundDrinkingWaterThree: 0,
  cleannessFrequencyOne: 0,
  cleannessFrequencyTwo: 0,
  availabilityCleaning: 0,
  numberOfToiletsOne: 0,
  numberOfToiletsTwo: 0,
  numberOfToiletsThree: 0,
  numberOfToiletsFour: 0,
  numberOfToiletsFive: 0,
  numberOfToiletsSix: 0,
  numberOfToiletsSeven: 0,
  numberOfToiletsEight: 0,
  distanceAccessibilityToiletOne: 0,
  distanceAccessibilityToiletTwo: 0,
  distanceAccessibilityToiletThree: 0,
  distanceAccessibilityToiletFour: 0,
  distanceAccessibilityToiletFive: 0,
  distanceAccessibilityToiletSix: 0,
  distanceAccessibilityToiletSeven: 0,
  conditionOfToiletOne: 0,
  conditionOfToiletTwo: 0,
  conditionOfToiletThree: 0,
  conditionOfToiletFour: 0,
  conditionOfToiletFive: 0,
  conditionOfToiletSix: 0,
  cleanToiletOne: 0,
  cleanToiletTwo: 0,
  cleanToiletThree: 0,
  cleanToiletFour: 0,
  cleanToiletFive: 0,
  separatedUniversalAccessibleOne: 0,
  separatedUniversalAccessibleTwo: 0,
  separatedUniversalAccessibleThree: 0,
  separatedUniversalAccessibleFour: 0,
  separatedFemaleToiletOne: 0,
  separatedFemaleToiletTwo: 0,
  separatedFemaleToiletThree: 0,
  dustbinAvailabilityOne: 0,
  dustbinAvailabilityTwo: 0,
  stormWaterDrainOne: 0,
};

const INITIAL_EXPERT = { name: "", experience: "", email: "", expertise: "" };

const indicatorConfig = [
  {
    name: "waterQuality",
    left: "Water Quality",
    right: "Quantity of Water System",
    leftImage: waterQuality,
    rightImage: quantityWaterSystem,
  },
  {
    name: "quantityOfWaterSystem",
    left: "Water Quality",
    right: "Ease to Buy Drinking Water (Bottle/Packet)",
    leftImage: waterQuality,
    rightImage: easetoBuyDrinking,
  },
  {
    name: "easeToBuyDrinkingWater",
    left: "Water Quality",
    right: "Affordability Factor",
    leftImage: waterQuality,
    rightImage: affordabilityFactor,
  },
  { name: "waterQualityTwo", 
    left: "Water Quality", 
    right: "Water Security", 
    leftImage: waterQuality,
    rightImage: waterSecurity, 
  },
  {
    name: "waterQualityThree",
    left: "Water Quality",
    right: "Cleaning Around Drinking Water Area",
    leftImage: waterQuality,
    rightImage: cleaningAroundDrinkingWater,
  },
  {
    name: "waterQualityFour",
    left: "Water Quality",
    right: "Availability of Cleaning Team/Workers",
    leftImage: waterQuality,
    rightImage: availabilityCleaningTeam,
  },
  {
    name: "waterQualityFive",
    left: "Water Quality",
    right: "Complaint Regarding Water and Cleanness",
    leftImage: waterQuality,
    rightImage: complaintRegardingWater,
  },
  {
    name: "qualityWaterSystemOne",
    left: "Quantity of Water System",
    right: "Ease to Buy Drinking Water (Bottle/Packet)",
    leftImage: quantityWaterSystem,
    rightImage: easetoBuyDrinking,
  },
  {
    name: "qualityWaterSystemTwo",
    left: "Quantity of Water System",
    right: "Affordability Factor",
    leftImage: quantityWaterSystem,
    rightImage: affordabilityFactor,
  },
  {
    name: "qualityWaterSystemThree",
    left: "Quantity of Water System",
    right: "Water Security",
    leftImage: quantityWaterSystem,
    rightImage: waterSecurity,
  },
  {
    name: "qualityWaterSystemFour",
    left: "Quantity of Water System",
    right: "Cleaning Around Drinking Water Area",
    leftImage: quantityWaterSystem,
    rightImage: cleaningAroundDrinkingWater,
  },
  {
    name: "qualityWaterSystemFive",
    left: "Quantity of Water System",
    right: "Cleaning Frequency",
    leftImage: quantityWaterSystem,
    rightImage: cleaningFrequency,
  },
  {
    name: "qualityWaterSystemSix",
    left: "Quantity of Water System",
    right: "Availability of Cleaning Team/Workers",
    leftImage: quantityWaterSystem,
    rightImage: availabilityCleaningTeam,
  },
  {
    name: "qualityWaterSystemSeven",
    left: "Quantity of Water System",
    right: "Complaint Regarding Water and Cleanness",
    leftImage: quantityWaterSystem,
    rightImage: complaintRegardingWater,
  },
  {
    name: "easeDrinkingWaterOne",
    left: "Ease to Buy Drinking Water (Bottle/Packet)",
    right: "Affordability Factor",
    leftImage: easetoBuyDrinking,
    rightImage: affordabilityFactor,
  },
  {
    name: "easeDrinkingWaterTwo",
    left: "Ease to Buy Drinking Water (Bottle/Packet)",
    right: "Water Security",
    leftImage: easetoBuyDrinking,
    rightImage: waterSecurity,
  },
  {
    name: "easeDrinkingWaterThree",
    left: "Ease to Buy Drinking Water (Bottle/Packet)",
    right: "Complaint Regarding Water and Cleanness",
    leftImage: easetoBuyDrinking,
    rightImage: complaintRegardingWater,
  },
  {
    name: "easeDrinkingWaterFour",
    left: "Ease to Buy Drinking Water (Bottle/Packet)",
    right: "Cleaning Around Drinking Water Area",
    leftImage: easetoBuyDrinking,
    rightImage: cleaningAroundDrinkingWater,
  },
  {
    name: "easeDrinkingWaterFive",
    left: "Ease to Buy Drinking Water (Bottle/Packet)",
    right: "Cleanness Frequency",
    leftImage: easetoBuyDrinking,
    rightImage: cleaningFrequency,
  },
  {
    name: "easeDrinkingWaterSix",
    left: "Ease to Buy Drinking Water (Bottle/Packet)",
    right: "Availability of Cleaning Team/Workers",
    leftImage: easetoBuyDrinking,
    rightImage: availabilityCleaningTeam,
  },
  {
    name: "affordabilityFactorOne",
    left: "Affordability Factor",
    right: "Water Security",
    leftImage: affordabilityFactor,
    rightImage: waterSecurity,
  },
  {
    name: "affordabilityFactorTwo",
    left: "Affordability Factor",
    right: "Cleaning Around Drinking Water Area",
    leftImage: affordabilityFactor,
    rightImage: cleaningAroundDrinkingWater,
  },
  {
    name: "affordabilityFactorThree",
    left: "Affordability Factor",
    right: "Cleanness Frequency",
    leftImage: affordabilityFactor,
    rightImage: cleaningFrequency,
  },
  {
    name: "affordabilityFactorFour",
    left: "Affordability Factor",
    right: "Availability of Cleaning Team/Workers",
    leftImage: affordabilityFactor,
    rightImage: availabilityCleaningTeam,
  },
  {
    name: "affordabilityFactorFive",
    left: "Affordability Factor",
    right: "Complaint Regarding Water and Cleanness",
    leftImage: affordabilityFactor,
    rightImage: complaintRegardingWater,
  },
  {
    name: "waterSecurityOne",
    left: "Water Security",
    right: "Cleaning Around Drinking Water Area",
    leftImage: waterSecurity,
    rightImage: cleaningAroundDrinkingWater,
  },
  {
    name: "waterSecurityTwo",
    left: "Water Security",
    right: "Cleanness Frequency",
    leftImage: waterSecurity,
    rightImage: cleaningFrequency,
  },
  {
    name: "waterSecurityThree",
    left: "Water Security",
    right: "Availability of Cleaning Team/Workers",
    leftImage: waterSecurity,
    rightImage: availabilityCleaningTeam,
  },
  {
    name: "waterSecurityFour",
    left: "Water Security",
    right: "Complaint Regarding Water and Cleanness",
    leftImage: waterSecurity,
    rightImage: complaintRegardingWater,
  },
  {
    name: "cleaningAroundDrinkingWaterOne",
    left: "Cleaning Around Drinking Water Area",
    right: "Cleanness Frequency",
    leftImage: cleaningAroundDrinkingWater,
    rightImage: cleaningFrequency,
  },
  {
    name: "cleaningAroundDrinkingWaterTwo",
    left: "Cleaning Around Drinking Water Area",
    right: "Availability of Cleaning Team/Workers",
    leftImage: cleaningAroundDrinkingWater,
    rightImage: availabilityCleaningTeam,
  },
  {
    name: "cleaningAroundDrinkingWaterThree",
    left: "Cleaning Around Drinking Water Area",
    right: "Complaint Regarding Water and Cleanness",
    leftImage: cleaningAroundDrinkingWater,
    rightImage: complaintRegardingWater,
  },
  {
    name: "cleannessFrequencyOne",
    left: "Cleanness Frequency",
    right: "Availability of Cleaning Team/Workers",
    leftImage: cleaningFrequency,
    rightImage: availabilityCleaningTeam,
  },
  {
    name: "cleannessFrequencyTwo",
    left: "Cleanness Frequency",
    right: "Complaint Regarding Water and Cleanness",
    leftImage: cleaningFrequency,
    rightImage: complaintRegardingWater,
  },
  {
    name: "availabilityCleaning",
    left: "Availability of Cleaning Team/Workers",
    right: "Complaint Regarding Water and Cleanness",
    leftImage: availabilityCleaningTeam,
    rightImage: complaintRegardingWater,
  },
];

const indicatorSanitation = [
  { name: "numberOfToiletsOne", left: "Number of Toilets", right: "Distance and Accessibility to Toilet", leftImage: numberToilet, rightImage: distanceToilet },
  { name: "numberOfToiletsTwo", left: "Number of Toilets", right: "Condition of Toilet (Water, Light)", leftImage: numberToilet, rightImage: conditionToilet },
  { name: "numberOfToiletsThree", left: "Number of Toilets", right: "Cleaning of Toilet", leftImage: numberToilet, rightImage: cleaningToilet },
  { name: "numberOfToiletsFour", left: "Number of Toilets", right: "Separated Universal Accessible Toilets", leftImage: numberToilet, rightImage: SeparatedUniversalAccessible },
  { name: "numberOfToiletsFive", left: "Number of Toilets", right: "Separated Female Toilets", leftImage: numberToilet, rightImage: SeparatedFemaleToilet },
  { name: "numberOfToiletsSix", left: "Number of Toilets", right: "Dustbin Availability", leftImage: numberToilet, rightImage: dustbinAvailability },
  { name: "numberOfToiletsSeven", left: "Number of Toilets", right: "Storm Water Drain and Sewer Line", leftImage: numberToilet, rightImage:  stormWaterDrain},
  { name: "numberOfToiletsEight", left: "Number of Toilets", right: "Complaint Regarding Water and Cleanness", leftImage: numberToilet, rightImage: complaintRegardingWater },
  { name: "distanceAccessibilityToiletOne", left: "Distance and Accessibility to Toilet", right: "Condition of Toilet (Water, Light)", leftImage: distanceToilet, rightImage: conditionToilet },
  { name: "distanceAccessibilityToiletTwo", left: "Distance and Accessibility to Toilet", right: "Cleaning of Toilet", leftImage: distanceToilet, rightImage: cleaningToilet },
  { name: "distanceAccessibilityToiletThree", left: "Distance and Accessibility to Toilet", right: "Separated Universal Accessible Toilets", leftImage: distanceToilet, rightImage: SeparatedUniversalAccessible },
  { name: "distanceAccessibilityToiletFour", left: "Distance and Accessibility to Toilet", right: "Separated Female Toilets", leftImage: distanceToilet, rightImage: SeparatedFemaleToilet },
  { name: "distanceAccessibilityToiletFive", left: "Distance and Accessibility to Toilet", right: "Dustbin Availability", leftImage: distanceToilet, rightImage: dustbinAvailability },
  { name: "distanceAccessibilityToiletSix", left: "Distance and Accessibility to Toilet", right: "Storm Water Drain and Sewer Line", leftImage: distanceToilet, rightImage: stormWaterDrain },
  { name: "distanceAccessibilityToiletSeven", left: "Distance and Accessibility to Toilet", right: "Complaint Regarding Water and Cleanness", leftImage: distanceToilet, rightImage: complaintRegardingWater },
  { name: "conditionOfToiletOne", left: "Condition of Toilet (Water, Light)", right: "Cleaning of Toilet", leftImage: conditionToilet, rightImage: cleaningToilet },
  { name: "conditionOfToiletTwo", left: "Condition of Toilet (Water, Light)", right: "Separated Universal Accessible Toilets", leftImage: conditionToilet, rightImage: SeparatedUniversalAccessible },
  { name: "conditionOfToiletThree", left: "Condition of Toilet (Water, Light)", right: "Separated Female Toilets", leftImage: conditionToilet, rightImage: SeparatedFemaleToilet },
  { name: "conditionOfToiletFour", left: "Condition of Toilet (Water, Light)", right: "Dustbin Availability", leftImage: conditionToilet, rightImage: dustbinAvailability },
  { name: "conditionOfToiletFive", left: "Condition of Toilet (Water, Light)", right: "Storm Water Drain and Sewer Line", leftImage: conditionToilet, rightImage: stormWaterDrain },
  { name: "conditionOfToiletSix", left: "Condition of Toilet (Water, Light)", right: "Complaint Regarding Water and Cleanness", leftImage: conditionToilet, rightImage: complaintRegardingWater },
  { name: "cleanToiletOne", left: "Cleaning of Toilet", right: "Separated Universal Accessible Toilets", leftImage: cleaningToilet, rightImage: SeparatedUniversalAccessible },
  { name: "cleanToiletTwo", left: "Cleaning of Toilet", right: "Separated Female Toilets", leftImage: cleaningToilet, rightImage: SeparatedFemaleToilet },
  { name: "cleanToiletThree", left: "Cleaning of Toilet", right: "Dustbin Availability", leftImage: cleaningToilet, rightImage: dustbinAvailability },
  { name: "cleanToiletFour", left: "Cleaning of Toilet", right: "Storm Water Drain and Sewer Line", leftImage: cleaningToilet, rightImage: stormWaterDrain },
  { name: "cleanToiletFive", left: "Cleaning of Toilet", right: "Complaint Regarding Water and Cleanness", leftImage: cleaningToilet, rightImage: complaintRegardingWater },
  { name: "separatedUniversalAccessibleOne", left: "Separated Universal Accessible Toilets", right: "Separated Female Toilets", leftImage: SeparatedUniversalAccessible, rightImage: SeparatedFemaleToilet },
  { name: "separatedUniversalAccessibleTwo", left: "Separated Universal Accessible Toilets", right: "Dustbin Availability", leftImage: SeparatedUniversalAccessible, rightImage: dustbinAvailability },
  { name: "separatedUniversalAccessibleThree", left: "Separated Universal Accessible Toilets", right: "Storm Water Drain and Sewer Line", leftImage: SeparatedUniversalAccessible, rightImage: stormWaterDrain },
  { name: "separatedUniversalAccessibleFour", left: "Separated Universal Accessible Toilets", right: "Complaint Regarding Water and Cleanness", leftImage: SeparatedUniversalAccessible, rightImage: complaintRegardingWater },
  { name: "separatedFemaleToiletOne", left: "Separated Female Toilets", right: "Dustbin Availability", leftImage: SeparatedFemaleToilet, rightImage: dustbinAvailability },
  { name: "separatedFemaleToiletTwo", left: "Separated Female Toilets", right: "Storm Water Drain and Sewer Line", leftImage: SeparatedFemaleToilet, rightImage: stormWaterDrain },
  { name: "separatedFemaleToiletThree", left: "Separated Female Toilets", right: "Complaint Regarding Water and Cleanness", leftImage: SeparatedFemaleToilet, rightImage: complaintRegardingWater },
  { name: "dustbinAvailabilityOne", left: "Dustbin Availability", right: "Storm Water Drain and Sewer Line", leftImage: dustbinAvailability, rightImage: stormWaterDrain },
  { name: "dustbinAvailabilityTwo", left: "Dustbin Availability", right: "Complaint Regarding Water and Cleanness", leftImage: dustbinAvailability, rightImage: complaintRegardingWater },
  { name: "stormWaterDrainOne", left: "Storm Water Drain and Sewer Line", right: "Complaint Regarding Water and Cleanness", leftImage: stormWaterDrain, rightImage: complaintRegardingWater },
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
    <Box sx={{ minHeight: "100vh", width: "100vw", bgcolor: "#f5f5f5" }}>
      <ToastContainer position={isMobile ? "top-center" : "top-right"} />

      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: "#248af0ff" }}>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#000000ff",
            alignContent: "center",
            textAlign: "center",
            mb: 2,
            mt: 2,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Analytic Hierarchy Process (AHP) Survey
        </Typography>
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
          <Toolbar sx={{ justifyContent: "center", flexWrap: "wrap" }}>
            {LOGOS.map(({ src, alt }) => (
              <img
                key={alt}
                src={src}
                alt={alt}
                height={isMobile ? 30 : 90}
                style={{ margin: "0 8px" }}
              />
            ))}
          </Toolbar>

          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              color: "#2196f3",
              mb: 3,
              fontWeight: "600",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
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
                  fontSize: { xs: "0.9rem", sm: "1rem" },
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
                  fontSize: { xs: "0.9rem", sm: "1rem" },
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
                sx={{ color: "#2196f3", mt: 2, fontWeight: "bold" }}
              >
                Importance of This Survey:
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
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
                sx={{ color: "#2196f3", fontWeight: "bold" }}
              >
                What is AHP?
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
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
                sx={{ color: "#2196f3", fontWeight: "bold" }}
              >
                Why AHP in This Study?
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
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
                sx={{ color: "#2196f3", fontWeight: "bold" }}
              >
                How to Fill This Form:
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  lineHeight: 1.6,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
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
                      <li>
                        <strong>5':</strong> Second indicator is extremely more
                        important.
                      </li>
                      <li>
                        <strong>4':</strong> Strongly more important.
                      </li>
                      <li>
                        <strong>3':</strong> Moderately more important.
                      </li>
                      <li>
                        <strong>2':</strong> Weakly more important.
                      </li>
                      <li>
                        <strong>1':</strong> Slightly more important.
                      </li>
                      <li>
                        <strong>0:</strong> Equal importance.
                      </li>
                      <li>
                        <strong>1:</strong> First indicator is slightly more
                        important.
                      </li>
                      <li>
                        <strong>2:</strong> Weakly more important.
                      </li>
                      <li>
                        <strong>3:</strong> Moderately more important.
                      </li>
                      <li>
                        <strong>4:</strong> Strongly more important.
                      </li>
                      <li>
                        <strong>5:</strong> Extremely more important.
                      </li>
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
              fontSize: { xs: "0.9rem", sm: "1rem" },
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
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="bold"
            color="#2c3e50"
            mb={2}
          >
            Expert Details
          </Typography>

          <Grid container spacing={2}>
            {[
              { label: "Name/Organization", name: "name" },
              {
                label: "Years of Experience in WASH",
                name: "experience",
                type: "number",
                required: true,
              },
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
                  onChange={(e) =>
                    handleExpertChange(field.name, e.target.value)
                  }
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4, borderRadius: 3 }}>
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="bold"
            color="#2c3e50"
          >
            Drinking Water
          </Typography>
        </Paper>

        {/* Indicators */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {indicatorConfig.map(({ name, left ,right, leftImage, rightImage }) => (
            <WaterQualityIndicator
              key={name}
              leftImage= {leftImage}
              rightImage= {rightImage}
              leftLabel={left}
              rightLabel={right}
              name={name}
              value={indicators[name]}
              onChange={handleIndicatorChange}
              isMobile={isMobile}
            />
          ))}
        </Box>

        <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4, borderRadius: 3 }}>
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="bold"
            color="#2c3e50"
          >
            Sanitation
          </Typography>
        </Paper>

        {/* Indicators */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {indicatorSanitation.map(({ name, left, right, leftImage, rightImage }) => (
            <WaterQualityIndicator
              key={name}
              leftImage= {leftImage}
              rightImage= {rightImage}
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
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
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
            sx={{
              px: 5,
              borderRadius: 2,
              fontWeight: "bold",
              borderColor: "#2196f3",
              color: "#2196f3",
            }}
          >
            🔄 Reset All Indicators
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 2,
          bgcolor: "#248af0ff",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          Indian Institute of Technology Roorkee | Department of Water Resources
          Development and Management © 2025
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          Contact: Harsh Pathak | harsh_p@wr.iitr.ac.in | Enrollment No.
          24571001
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
