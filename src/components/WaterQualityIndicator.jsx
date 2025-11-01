import React from 'react';
import { Slider, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// --- Color Function (unchanged)
const getColorForValue = (value) => {
  if (value < 0) {
    // const intensity = Math.abs(value);
    // const redValue = 200 + intensity * 11;
    // const greenBlueValue = 100 - intensity * 20;
    // return `rgb(${redValue}, ${greenBlueValue}, ${greenBlueValue})`;
    return `#44ff44`;
  } else if (value > 0) {
    // const intensity = value;
    // const greenValue = 200 + intensity * 11;
    // const redBlueValue = 100 - intensity * 20;
    // return `rgb(${redBlueValue}, ${greenValue}, ${redBlueValue})`;
    return `#44ff44`;
  } else return '#2196f3';
};

// --- Styled Components (Responsive Tweaks)
const IndicatorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1, 'auto'),
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: 900,
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(1.5), margin: '12px auto' },
  [theme.breakpoints.up('md')]: { padding: theme.spacing(3) },
}));

const DynamicSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== 'sliderValue',
})(({ sliderValue, theme }) => ({
  height: 6,
  [theme.breakpoints.up('sm')]: { height: 8 },
  '& .MuiSlider-track': {
    border: 'none',
    background: 'linear-gradient(90deg, #44ff44 0%, #2196f3 50%, #44ff44 100%)',
    // background: 'linear-gradient(90deg, #ff4444 0%, #2196f3 50%, #44ff44 100%)',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    [theme.breakpoints.up('sm')]: { height: 22, width: 22 },
    [theme.breakpoints.up('md')]: { height: 24, width: 24 },
    backgroundColor: getColorForValue(sliderValue),
    border: '2px solid #fff',
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 10,
    [theme.breakpoints.up('sm')]: { fontSize: 12 },
    [theme.breakpoints.up('md')]: { fontSize: 13 },
    background: 'unset',
    backgroundColor: getColorForValue(sliderValue),
  },
}));

const LabelContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  minWidth: 60,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: { minWidth: 80 },
  [theme.breakpoints.up('md')]: { minWidth: 100 },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  fontSize: '22px',
  [theme.breakpoints.up('sm')]: { fontSize: '26px' },
  [theme.breakpoints.up('md')]: { fontSize: '30px' },
}));

const ColorScale = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
  height: 4,
  borderRadius: 3,
  overflow: 'hidden',
}));

const ColorSegment = styled(Box)({ flex: 1, height: '100%' });

const ScaleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(1),
  padding: '0 6px',
}));

const ScaleNumber = styled(Typography)(({ theme }) => ({
  fontSize: 10,
  [theme.breakpoints.up('sm')]: { fontSize: 12 },
  [theme.breakpoints.up('md')]: { fontSize: 14 },
  fontWeight: 'bold',
  color: '#666',
  minWidth: 16,
  textAlign: 'center',
}));

const WaterQualityIndicator = ({
  heading = '',
  leftImage,
  rightImage,
  leftLabel = 'Not Good',
  rightLabel = 'Good',
  value,
  onChange,
  name,
  isMobile = false,
}) => {
  const handleSliderChange = (e, newValue) => onChange(name, newValue);
  // const getValueLabelFormat = (value) => (value === 0 ? '0' : value > 0 ? `${value}` : value.toString());
  const getValueLabelFormat = (value) => Math.abs(value).toString();

  return (
    <IndicatorContainer>
      <Typography
        variant={isMobile ? 'subtitle1' : 'h6'}
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#2c3e50',
          mb: { xs: 1.5, sm: 2 },
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          lineHeight: 1.2,
        }}
      >
        {heading || ''}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 1.5, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
        }}
      >
        {/* Left Label */}
        <LabelContainer>
          {leftImage && <IconContainer sx={{ color: '#4caf50' }}><img
                src={leftImage}
                alt="imagesss"
                height={isMobile ? 30 : 60}
                style={{ margin: "0 8px" }}
              /></IconContainer>}
          {/* {leftImage && <IconContainer sx={{ color: '#f44336' }}>{leftImage}</IconContainer>} */}
          {/* <Typography variant="caption" color="error" sx={{ fontWeight: 'bold' }}> */}
          <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
            {leftLabel}
          </Typography>
        </LabelContainer>

        {/* Slider */}
        <Box sx={{ flex: 1, width: '100%', mt: { xs: 1, sm: 0 } }}>
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
          <ColorScale>
            {['#2e7d32', '#4caf50', '#81c784', '#a5d6a7', '#c8e6c9', '#2196f3', '#c8e6c9', '#a5d6a7', '#81c784', '#4caf50', '#2e7d32'].map(
              (color, idx) => (
                <ColorSegment key={idx} sx={{ backgroundColor: color }} />
              )
            )}
          </ColorScale>

          <ScaleContainer>
            {["5'", "4'", "3'", "2'", "1'", '0', '1', '2', '3', '4', '5'].map((num, i) => (
              // <ScaleNumber key={i} sx={{ color: num === '0' ? '#2196f3' : num.includes("'") ? '#f44336' : '#4caf50' }}>
              <ScaleNumber key={i} sx={{ color: num === '0' ? '#2196f3' : num.includes("'") ? '#4caf50' : '#4caf50' }}>
                {num}
              </ScaleNumber>
            ))}
          </ScaleContainer>
        </Box>

        {/* Right Label */}
        <LabelContainer>
          {rightImage && <IconContainer sx={{ color: '#4caf50' }}><img
                src={rightImage}
                alt="imagesss"
                height={isMobile ? 30 : 60}
                style={{ margin: "0 8px" }}
              /></IconContainer>}
          <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
            {rightLabel}
          </Typography>
        </LabelContainer>
      </Box>

      {/* Current Value */}
      <Box
        sx={{
          mt: { xs: 1, sm: 1.5 },
          textAlign: 'center',
          py: 0.8,
          borderRadius: 6,
          backgroundColor: '#f8f9fa',
        }}
      >
        <Typography
          variant={isMobile ? 'caption' : 'body2'}
          sx={{ fontWeight: 'bold', color: '#666', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          Current Value:{' '}
          <span
            style={{
              color: getColorForValue(value),
              marginLeft: '4px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 'bold',
            }}
          >

            {/* {getValueLabelFormat(value)} */}
            {getValueLabelFormat(Math.abs(value))}
          </span>
        </Typography>
      </Box>
    </IndicatorContainer>
  );
};

export default WaterQualityIndicator;
