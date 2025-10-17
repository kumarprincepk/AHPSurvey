import React from 'react';
import { Slider, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Function to get color based on value
const getColorForValue = (value) => {
  if (value < 0) {
    const intensity = Math.abs(value);
    const redValue = 200 + (intensity * 11);
    const greenBlueValue = 100 - (intensity * 20);
    return `rgb(${redValue}, ${greenBlueValue}, ${greenBlueValue})`;
  } else if (value > 0) {
    const intensity = value;
    const greenValue = 200 + (intensity * 11);
    const redBlueValue = 100 - (intensity * 20);
    return `rgb(${redBlueValue}, ${greenValue}, ${redBlueValue})`;
  } else {
    return '#2196f3';
  }
};

// Styled components for better UI
const IndicatorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1, 'auto'),
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(2, 'auto'),
  },
}));

// Dynamic slider styling based on value
const DynamicSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== 'sliderValue',
})(({ sliderValue, theme }) => ({
  height: 6,
  [theme.breakpoints.up('sm')]: {
    height: 8,
  },
  '& .MuiSlider-track': {
    border: 'none',
    background: 'linear-gradient(90deg, #ff4444 0%, #2196f3 50%, #44ff44 100%)',
  },
  '& .MuiSlider-rail': {
    background: 'linear-gradient(90deg, #ff4444 0%, #2196f3 50%, #44ff44 100%)',
    opacity: 0.3,
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    [theme.breakpoints.up('sm')]: {
      height: 24,
      width: 24,
    },
    backgroundColor: getColorForValue(sliderValue),
    border: '2px solid #fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 10,
    [theme.breakpoints.up('sm')]: {
      fontSize: 12,
    },
    background: 'unset',
    padding: 0,
    width: 28,
    height: 28,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: getColorForValue(sliderValue),
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
      color: '#fff',
      fontWeight: 'bold',
    },
  },
}));

const ScaleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '6px',
  padding: '0 5px',
  [theme.breakpoints.up('sm')]: {
    marginTop: '8px',
    padding: '0 10px',
  },
}));

const ScaleNumber = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  fontWeight: 'bold',
  color: '#666',
  minWidth: '16px',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    fontSize: '12px',
    minWidth: '20px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 8px',
  fontSize: '20px',
  minWidth: '40px',
  [theme.breakpoints.up('sm')]: {
    margin: '0 16px',
    fontSize: '24px',
    minWidth: '50px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '28px',
    minWidth: '60px',
  },
}));

const LabelContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  minWidth: '70px',
  [theme.breakpoints.up('sm')]: {
    minWidth: '80px',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: '100px',
  },
}));

// Color indicator for scale
const ColorScale = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '6px',
  height: '3px',
  borderRadius: '2px',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    marginTop: '8px',
    height: '4px',
  },
}));

const ColorSegment = styled(Box)({
  flex: 1,
  height: '100%',
});

const WaterQualityIndicator = ({ 
  heading, 
  leftImage, 
  rightImage, 
  leftLabel = "Not Good", 
  rightLabel = "Good", 
  value,
  onChange,
  name,
  isMobile = false
}) => {
  const handleSliderChange = (event, newValue) => {
    onChange(name, newValue);
  };

  const getValueLabelFormat = (value) => {
    return value === 0 ? '0' : value > 0 ? `+${value}` : value.toString();
  };

  return (
    <IndicatorContainer elevation={2}>
      <Typography 
        variant={isMobile ? "subtitle1" : "h6"}
        gutterBottom 
        align="center"
        sx={{ 
          fontWeight: "bold", 
          color: "#2c3e50",
          mb: 2,
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
        }}
      >
        {heading}
      </Typography>
      
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        gap: 1,
        flexDirection: { xs: "column", sm: "row" }
      }}>
        {/* Left side - Negative values */}
        <LabelContainer sx={{ order: { xs: 1, sm: 1 } }}>
          <IconContainer sx={{ color: "#f44336" }}>
            {leftImage || "💧"}
          </IconContainer>
          <Typography 
            variant={isMobile ? "caption" : "body2"} 
            color="error" 
            sx={{ fontWeight: "bold" }}
          >
            {leftLabel}
          </Typography>
        </LabelContainer>

        {/* Slider */}
        <Box sx={{ 
          flex: 1, 
          width: "100%",
          order: { xs: 3, sm: 2 },
          mt: { xs: 1, sm: 0 }
        }}>
          <DynamicSlider
            sliderValue={value}
            value={value}
            min={-5}
            max={5}
            step={1}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            valueLabelFormat={getValueLabelFormat}
            marks
          />
          
          {/* Color scale indicator */}
          <ColorScale>
            <ColorSegment sx={{ backgroundColor: "#ff1744" }} />
            <ColorSegment sx={{ backgroundColor: "#ff5252" }} />
            <ColorSegment sx={{ backgroundColor: "#ff7961" }} />
            <ColorSegment sx={{ backgroundColor: "#ff9e9e" }} />
            <ColorSegment sx={{ backgroundColor: "#ffcdd2" }} />
            <ColorSegment sx={{ backgroundColor: "#2196f3" }} />
            <ColorSegment sx={{ backgroundColor: "#c8e6c9" }} />
            <ColorSegment sx={{ backgroundColor: "#a5d6a7" }} />
            <ColorSegment sx={{ backgroundColor: "#81c784" }} />
            <ColorSegment sx={{ backgroundColor: "#4caf50" }} />
            <ColorSegment sx={{ backgroundColor: "#2e7d32" }} />
          </ColorScale>
          
          <ScaleContainer>
            <ScaleNumber sx={{ color: "#d32f2f" }}>5'</ScaleNumber>
            <ScaleNumber sx={{ color: "#f44336" }}>4'</ScaleNumber>
            <ScaleNumber sx={{ color: "#ef5350" }}>3'</ScaleNumber>
            <ScaleNumber sx={{ color: "#e57373" }}>2'</ScaleNumber>
            <ScaleNumber sx={{ color: "#ef9a9a" }}>1'</ScaleNumber>
            <ScaleNumber sx={{ 
              fontWeight: "bold", 
              color: "#2196f3",
              fontSize: { xs: '11px', sm: '14px', md: '16px' }
            }}>0</ScaleNumber>
            <ScaleNumber sx={{ color: "#81c784" }}>1</ScaleNumber>
            <ScaleNumber sx={{ color: "#4caf50" }}>2</ScaleNumber>
            <ScaleNumber sx={{ color: "#388e3c" }}>3</ScaleNumber>
            <ScaleNumber sx={{ color: "#2e7d32" }}>4</ScaleNumber>
            <ScaleNumber sx={{ color: "#1b5e20" }}>5</ScaleNumber>
          </ScaleContainer>
        </Box>

        {/* Right side - Positive values */}
        <LabelContainer sx={{ order: { xs: 2, sm: 3 } }}>
          <IconContainer sx={{ color: "#4caf50" }}>
            {rightImage || "💧"}
          </IconContainer>
          <Typography 
            variant={isMobile ? "caption" : "body2"} 
            color="success.main" 
            sx={{ fontWeight: "bold" }}
          >
            {rightLabel}
          </Typography>
        </LabelContainer>
      </Box>

      {/* Current value display with color */}
      <Box sx={{ 
        mt: 1, 
        textAlign: "center",
        padding: "6px",
        borderRadius: "6px",
        backgroundColor: "#f5f5f5"
      }}>
        <Typography 
          variant={isMobile ? "caption" : "body2"} 
          sx={{ fontWeight: "bold", color: "#666" }}
        >
          Current Value: 
          <span style={{ 
            color: getColorForValue(value),
            marginLeft: "4px",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: "bold"
          }}>
            {getValueLabelFormat(value)}
          </span>
        </Typography>
      </Box>
    </IndicatorContainer>
  );
};

export default WaterQualityIndicator;