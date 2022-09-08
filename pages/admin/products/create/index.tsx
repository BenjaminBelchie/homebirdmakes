import { AccountCircle } from '@mui/icons-material';
import { 
    Box, 
    Button, 
    Divider, 
    InputAdornment, 
    Paper, 
    Stack, 
    TextField, 
    Typography 
} from '@mui/material';
import React from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function AddProduct(props){
    return (
        <Box sx={{minHeight:"100vh", width:"100%"}}>
            <Paper 
                elevation={2} 
                sx={{
                    padding:4, 
                    borderRadius:4, 
                    margin:4, 
                    display:"flex", 
                    flexDirection: "column", 
                    alignItems: "center"
                }}>
                <Typography variant="h4">Add A Product</Typography>
                <Divider sx={{marginTop:2, marginBottom:2, width:"50%"}} />
                <Stack direction="column" spacing={2}>
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

                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        />
                        <label htmlFor="raised-button-file">
                        <Button startIcon={<CameraAltIcon />} variant="contained" component="span" size="small">
                            Upload Images
                        </Button>
                    </label> 
                </Stack>
                
            </Paper>            
        </Box>
    )
}