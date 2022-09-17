import { AccountCircle } from '@mui/icons-material';
import { 
    Box, 
    Button, 
    Divider, 
    InputAdornment, 
    Paper, 
    Stack, 
    Step, 
    StepContent, 
    StepLabel, 
    Stepper, 
    TextField, 
    Typography 
} from '@mui/material';
import React from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const steps = [
    {
      label: 'Product Details',
      content: <>
         <Stack direction="column" spacing={2} sx={{marginTop:2, marginBottom:2, maxWidth:"500px"}}>
            <TextField 
                label="Product Title" 
                variant='standard' 
                required 
                InputLabelProps={{ shrink: true }}/>
            <TextField
                label="Price"
                required
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <Typography variant="body1">£</Typography>
                    </InputAdornment>
                ),
                }}
                variant="standard"
            />
            <TextField 
                label="Etsy Link" 
                variant='standard' 
                required 
                InputLabelProps={{ shrink: true }}/>
        </Stack>
      </>,
    },
    {
      label: 'Product Images',
      content:
      <Box sx={{marginTop:2, marginBottom:2}}>
        <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            />
            <label htmlFor="raised-button-file">
            <Button startIcon={<CameraAltIcon />} variant="contained" component="span">
                Upload Images
            </Button>
        </label> 
      </Box>

    },
    {
      label: 'Review Product',
      content: <><p>Finish</p></>,
    },
  ];

export default function AddProduct(props){
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <Box sx={{
            minHeight:"100vh", 
            width:"100%", 
            backgroundImage:'url(/images/background_img1.jpg), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))', 
            backgroundBlendMode:"overlay", 
            backgroundSize:"cover", 
            objectFit:"cover", 
            paddingTop:4,
            backgroundPosition:"center center"}}>
            <Paper 
                elevation={2} 
                sx={{
                    padding:4, 
                    borderRadius:4, 
                    marginRight:4, 
                    marginLeft:4, 
                    display:"flex", 
                    flexDirection: "column", 
                }}>
                    <Typography variant="h4">Add A New Product</Typography>
                    <Divider sx={{marginTop:2, marginBottom:2, width:"100%"}} />


                    <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.content}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
            </Paper>            
        </Box>
    )
}