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

// Import your logos (make sure to add these images to your public folder)
const IITR_LOGO =
    "https://upload.wikimedia.org/wikipedia/en/2/2d/Indian_Institute_of_Technology_Roorkee_Logo.svg";
const WRDM_LOGO =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuE0PV0-hNr7LPji3WbzltjAG6WRYbPKHYQQ&s";
const DAP_LOGO =
    "https://media.licdn.com/dms/image/v2/D4D0BAQFyid74E8Exdw/company-logo_200_200/company-logo_200_200/0/1723616687141?e=2147483647&v=beta&t=5ES6iUoSwlG0tJlVKkbPT8TjkZICAvQih1MBVZ1kcfE";

const App = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    // const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [indicators, setIndicators] = useState({
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
    });

    const [expertDetails, setExpertDetails] = useState({
        name: "",
        experience: "",
        email: "",
        expertise: "",
    });

    const [errors, setErrors] = useState({});

    const handleIndicatorChange = (name, value) => {
        setIndicators((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleExpertDetailsChange = (field, value) => {
        setExpertDetails((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate experience
        if (!expertDetails.experience || expertDetails.experience < 0) {
            newErrors.experience =
                "Years of experience is required and must be a positive number";
        }

        // Validate email if provided
        if (expertDetails.email && !/\S+@\S+\.\S+/.test(expertDetails.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Validate name if provided (only alphabets and spaces)
        if (expertDetails.name && !/^[a-zA-Z\s]+$/.test(expertDetails.name)) {
            newErrors.name = "Name can only contain letters and spaces";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error("Please fix the form errors before submitting.");
            return;
        }

        // Check if at least one indicator is set to non-zero
        const hasIndicatorValues = Object.values(indicators).some(
            (value) => value !== 0
        );
        if (!hasIndicatorValues) {
            toast.warning("Please adjust at least one indicator before submitting.");
            return;
        }

        try {
            // Format the data for email
            const formattedData = {};
            Object.keys(indicators).forEach((key) => {
                const value = indicators[key];
                if (value < 0) {
                    formattedData[key] = { notGood: Math.abs(value) };
                } else if (value > 0) {
                    formattedData[key] = { good: value };
                } else {
                    formattedData[key] = { moderate: 0 };
                }
            });

            // Prepare email template parameters
            const formData = {
                expert_name: expertDetails.name || "Not provided",
                experience: expertDetails.experience,
                expert_email: expertDetails.email || "Not provided",
                expertise: expertDetails.expertise || "Not provided",
                water_quality: formattedData.waterQuality,
                water_quality_two: formattedData.waterQualityTwo,
                water_quality_three: formattedData.waterQualityThree,
                water_quality_four: formattedData.waterQualityFour,
                water_quality_five: formattedData.waterQualityFive,
                quality_water_system_one: formattedData.qualityWaterSystemOne,
                quality_water_system_two: formattedData.qualityWaterSystemTwo,
                quality_water_system_three: formattedData.qualityWaterSystemThree,
                quality_water_system_four: formattedData.qualityWaterSystemFour,
                quality_water_system_five: formattedData.qualityWaterSystemFive,
                quality_water_system_six: formattedData.qualityWaterSystemSix,
                quality_water_system_seven: formattedData.qualityWaterSystemSeven,
                ease_drink_water_one: formattedData.easeDrinkingWaterOne,
                ease_drink_water_two: formattedData.easeDrinkingWaterTwo,
                ease_drink_water_three: formattedData.easeDrinkingWaterThree,
                ease_drink_water_four: formattedData.easeDrinkingWaterFour,
                ease_drink_water_five: formattedData.easeDrinkingWaterFive,
                ease_drink_water_six: formattedData.easeDrinkingWaterSix,
                quantity_water_system: formattedData.quantityOfWaterSystem,
                ease_buy_water: formattedData.easeToBuyDrinkingWater,
                affordability: formattedData.affordabilityFactor,
                submission_date: new Date().toLocaleString(),
            };

            // send as JSON string
            const templateParams = {
                message: JSON.stringify(formData, null, 4),
            };


            console.log("Email sending with data:", templateParams);

            // Uncomment and use your actual EmailJS credentials
            const response = await emailjs.send(
                'service_6ntd6lb',
                'template_ofd6ufq',
                templateParams,
                'DEcnL1UogEkzIdR_k'
            );

            if (response.status === 200) {
                toast.success(
                    "Thank you! Your response has been submitted successfully."
                );

                // Reset form
                setExpertDetails({
                    name: "",
                    experience: "",
                    email: "",
                    expertise: "",
                });
                setIndicators({
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
                });
            }
        } catch (error) {
            console.error("Email sending failed:", error);
            toast.error("Failed to submit response. Please try again later.");
        }
    };

    const resetAll = () => {
        setIndicators({
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
        });
        toast.info("All indicators have been reset to zero.");
    };

    return (
        <div
            className="App"
            style={{
                minHeight: "100vh",
                width: "99vw",
                backgroundColor: "#f5f5f5",
                overflowX: "hidden"
            }}
        >
            <ToastContainer
                position={isMobile ? "top-center" : "top-right"}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <AppBar position="static" sx={{ backgroundColor: "#248af0ff", mb: 2 }}>
                <Toolbar sx={{ minHeight: { xs: '60px', sm: '64px' } }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexGrow: 1,
                            justifyContent: "center",
                            flexWrap: 'wrap',
                            gap: { xs: 1, sm: 2 }
                        }}
                    >
                        <img
                            src={IITR_LOGO}
                            alt="IIT Roorkee"
                            style={{
                                height: isMobile ? "30px" : "40px",
                                maxWidth: "100%"
                            }}
                        />
                        <img
                            src={WRDM_LOGO}
                            alt="WRD&M IITR"
                            style={{
                                height: isMobile ? "30px" : "40px",
                                maxWidth: "100%",
                                borderRadius: '10px'
                            }}
                        />
                        <img
                            src={DAP_LOGO}
                            alt="DAP IITR"
                            style={{
                                height: isMobile ? "30px" : "40px",
                                maxWidth: "100%",
                                filter: "brightness(1.1) contrast(1.2)",
                                mixBlendMode: "darken"
                            }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: { xs: 1, sm: 2 },
                    px: { xs: 1, sm: 2, md: 3 }
                }}
            >
                {/* Header Section */}
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
                        variant={isMobile ? "h4" : isTablet ? "h3" : "h3"}
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
                        <strong style={{ color: "#f44336" }}>Red colors</strong> indicate
                        poor quality ratings,
                        <strong style={{ color: "#4caf50" }}> green colors</strong> indicate
                        good quality ratings.
                        <br />
                        Colors intensify as you move away from center.
                    </Typography>
                </Paper>

                {/* Expert Details Form */}
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        mb: { xs: 2, sm: 3, md: 4 },
                        backgroundColor: "#ffffff",
                        borderRadius: "15px",
                        width: "100%",
                    }}
                >
                    <Typography
                        variant={isMobile ? "h6" : "h5"}
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "#2c3e50",
                            mb: 3,
                            textAlign: "center",
                        }}
                    >
                        Expert Details
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name/Organization"
                                value={expertDetails.name}
                                onChange={(e) =>
                                    handleExpertDetailsChange("name", e.target.value)
                                }
                                error={!!errors.name}
                                helperText={errors.name}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Years of Experience in WASH"
                                type="number"
                                value={expertDetails.experience}
                                onChange={(e) =>
                                    handleExpertDetailsChange("experience", e.target.value)
                                }
                                error={!!errors.experience}
                                helperText={errors.experience}
                                required
                                inputProps={{ min: 0 }}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={expertDetails.email}
                                onChange={(e) =>
                                    handleExpertDetailsChange("email", e.target.value)
                                }
                                error={!!errors.email}
                                helperText={errors.email}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Field of Expertise (e.g., Water Quality, Sanitation Infrastructure)"
                                value={expertDetails.expertise}
                                onChange={(e) =>
                                    handleExpertDetailsChange("expertise", e.target.value)
                                }
                                rows={isMobile ? 2 : 3}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {/* Indicators Section - Centered */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: { xs: 2, sm: 3 },
                    }}
                >
                    <WaterQualityIndicator
                        // heading="Water Quality"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Water Quality"
                        rightLabel="Quantity of Water System"
                        value={indicators.waterQuality}
                        onChange={handleIndicatorChange}
                        name="waterQuality"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Quantity of Water System"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Water Quality"
                        rightLabel="Ease to Buy Drinking Water (Bottle/Packet)"
                        value={indicators.quantityOfWaterSystem}
                        onChange={handleIndicatorChange}
                        name="quantityOfWaterSystem"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Ease to Buy Drinking Water (Bottle/Packet)"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Water Quality"
                        rightLabel="Affordability Factor"
                        value={indicators.easeToBuyDrinkingWater}
                        onChange={handleIndicatorChange}
                        name="easeToBuyDrinkingWater"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Water Quality"
                        rightLabel="Water Security"
                        value={indicators.waterQualityTwo}
                        onChange={handleIndicatorChange}
                        name="waterQualityTwo"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Water Quality"
                        rightLabel="Cleaning Around Drinking Water Area"
                        value={indicators.waterQualityThree}
                        onChange={handleIndicatorChange}
                        name="waterQualityThree"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Water Quality"
                        rightLabel="Availability of Cleaning Team/Workers"
                        value={indicators.waterQualityFour}
                        onChange={handleIndicatorChange}
                        name="waterQualityFour"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Water Quality"
                        rightLabel="Complaint Regarding Water and Cleanness"
                        value={indicators.waterQualityFive}
                        onChange={handleIndicatorChange}
                        name="waterQualityFive"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Quantity of Water System"
                        rightLabel="Ease to Buy Drinking Water (Bottle/Packet)"
                        value={indicators.qualityWaterSystemOne}
                        onChange={handleIndicatorChange}
                        name="qualityWaterSystemOne"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Quantity of Water System"
                        rightLabel="Affordability Factor"
                        value={indicators.qualityWaterSystemTwo}
                        onChange={handleIndicatorChange}
                        name="qualityWaterSystemTwo"
                        isMobile={isMobile}
                    />
                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Quantity of Water System"
                        rightLabel="Water Security"
                        value={indicators.qualityWaterSystemThree}
                        onChange={handleIndicatorChange}
                        name="qualityWaterSystemThree"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Quantity of Water System"
                        rightLabel="Cleaning Around Drinking Water Area"
                        value={indicators.qualityWaterSystemFour}
                        onChange={handleIndicatorChange}
                        name="qualityWaterSystemFour"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Quantity of Water System"
                        rightLabel="Cleaning Frequency"
                        value={indicators.qualityWaterSystemFive}
                        onChange={handleIndicatorChange}
                        name="qualityWaterSystemFive"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Quantity of Water System"
                        rightLabel="Availability of Cleaning Team/Workers"
                        value={indicators.qualityWaterSystemSix}
                        onChange={handleIndicatorChange}
                        name="qualityWaterSystemSix"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Quantity of Water System"
                        rightLabel="Complaint Regarding Water and Cleanness"
                        value={indicators.qualityWaterSystemSeven}
                        onChange={handleIndicatorChange}
                        name="qualityWaterSystemSeven"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Ease to Buy Drinking Water (Bottle/Packet)"
                        rightLabel="Affordability Factor"
                        value={indicators.easeDrinkingWaterOne}
                        onChange={handleIndicatorChange}
                        name="easeDrinkingWaterOne"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Ease to Buy Drinking Water (Bottle/Packet)"
                        rightLabel="Water Security"
                        value={indicators.easeDrinkingWaterTwo}
                        onChange={handleIndicatorChange}
                        name="easeDrinkingWaterTwo"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Ease to Buy Drinking Water (Bottle/Packet)"
                        rightLabel="Complaint Regarding Water and Cleanness"
                        value={indicators.easeDrinkingWaterThree}
                        onChange={handleIndicatorChange}
                        name="easeDrinkingWaterThree"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Ease to Buy Drinking Water (Bottle/Packet)"
                        rightLabel="Cleaning Around Drinking Water Area"
                        value={indicators.easeDrinkingWaterFour}
                        onChange={handleIndicatorChange}
                        name="easeDrinkingWaterFour"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Ease to Buy Drinking Water (Bottle/Packet)"
                        rightLabel="Cleanness Frequency"
                        value={indicators.easeDrinkingWaterFive}
                        onChange={handleIndicatorChange}
                        name="easeDrinkingWaterFive"
                        isMobile={isMobile}
                    />

                    <WaterQualityIndicator
                        // heading="Affordability Factor"
                        leftImage="🚫"
                        rightImage="✅"
                        leftLabel="Ease to Buy Drinking Water (Bottle/Packet)"
                        rightLabel="Availability of Cleaning Team/Workers"
                        value={indicators.easeDrinkingWaterSix}
                        onChange={handleIndicatorChange}
                        name="easeDrinkingWaterSix"
                        isMobile={isMobile}
                    />



                </Box>

                {/* Action Buttons - Centered */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "center",
                        gap: 2,
                        mt: { xs: 3, sm: 4 },
                        mb: { xs: 3, sm: 4 },
                        width: "100%",
                    }}
                >
                    <Button
                        variant="contained"
                        size={isMobile ? "medium" : "large"}
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: "#2196f3",
                            px: { xs: 3, sm: 5 },
                            py: { xs: 1, sm: 1.5 },
                            fontSize: { xs: "14px", sm: "16px" },
                            fontWeight: "bold",
                            borderRadius: "10px",
                            minWidth: { xs: "200px", sm: "auto" },
                            "&:hover": {
                                backgroundColor: "#1976d2",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        📊 Submit Assessment
                    </Button>

                    <Button
                        variant="outlined"
                        size={isMobile ? "medium" : "large"}
                        onClick={resetAll}
                        sx={{
                            px: { xs: 3, sm: 5 },
                            py: { xs: 1, sm: 1.5 },
                            fontSize: { xs: "14px", sm: "16px" },
                            fontWeight: "bold",
                            borderRadius: "10px",
                            borderColor: "#2196f3",
                            color: "#2196f3",
                            minWidth: { xs: "200px", sm: "auto" },
                            "&:hover": {
                                backgroundColor: "#e3f2fd",
                                borderColor: "#1976d2",
                                transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        🔄 Reset All Indicators
                    </Button>
                </Box>

            </Container>

            {/* Current Values Display - Centered with Colors */}
            
            {/* <Paper
          elevation={2}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mt: { xs: 1, sm: 2 },
            backgroundColor: "#e3f2fd",
            borderRadius: "15px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            📋 Current Indicator Values
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            {Object.entries(indicators).map(([key, value]) => (
              <Grid item xs={6} sm={3} key={key}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1,
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant={isMobile ? "caption" : "body2"}
                    sx={{ fontWeight: "bold", color: "#2c3e50" }}
                  >
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </Typography>
                  <Typography
                    variant={isMobile ? "body2" : "h6"}
                    sx={{
                      color:
                        value < 0
                          ? "#f44336"
                          : value > 0
                            ? "#4caf50"
                            : "#ff9800",
                      fontWeight: "bold",
                    }}
                  >
                    {value < 0 ? value : value > 0 ? `+${value}` : value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper> */}

            {/* Footer */}
            <Box
                sx={{
                    mt: 4,
                    py: 2,
                    backgroundColor: "#248af0ff",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Indian Institute of Technology Roorkee | Department of Water Resources
                    Development and Management © 2025
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Contact: Harsh Pathak | harsh_p@wr.iitr.ac.in | Enrollment No.
                    24571001
                </Typography>
            </Box>
        </div>
    );
};

export default App;