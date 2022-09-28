import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function MailingList(){
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openInfoSnackbar, setOpenInfoSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const isValidEmail = (email: string) => {  
        return  /\S+@\S+\.\S+/.test(email);
    }

    const handleCloseSuccessSnackbar = () => {
        setOpenSuccessSnackbar(false);
    }

    const handleCloseInfoSnackbar = () => {
        setOpenInfoSnackbar(false);
    }

    const handleCloseErrorSnackbar = () => {
        setOpenErrorSnackbar(false);
    }

    const handleSubscribe = () => {
        setLoading(true);
        axios.post("/api/subscribeUser", {
            email:email
        }).then((response) => {
            if(response.data.status === 200) {
                setOpenSuccessSnackbar(true);
                setEmail("");
            }
            if(response.data.status === 400){
                setOpenInfoSnackbar(true);
                setEmail("");
            }
            setLoading(false);
        })
    }


    return(
        <>
        <Box sx={{marginBottom:10}}>
            <Typography variant="caption" color="primary">Join my mailing list</Typography>
            <Stack direction="row">
                <TextField 
                    variant="outlined" 
                    size="small" 
                    disabled={loading}
                    placeholder="Email Address" 
                    value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                <Button 
                    variant="contained"
                    size="small" 
                    color="secondary" 
                    sx={{color:"white", boxShadow:"none"}} 
                    disabled={!isValidEmail(email) || loading} 
                    onClick={handleSubscribe}>
                        Subscribe</Button>
            </Stack>
        </Box>
        <Snackbar 
                open={openSuccessSnackbar} 
                autoHideDuration={6000} 
                onClose={handleCloseSuccessSnackbar} 
                anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}>
                <Alert onClose={handleCloseSuccessSnackbar} severity="success">
                    You&#39ve been added to the mailing list
                </Alert>
            </Snackbar>
            <Snackbar open={openInfoSnackbar} autoHideDuration={6000} onClose={handleCloseInfoSnackbar}  anchorOrigin={{vertical: 'top', horizontal: 'right',}}>
                <Alert onClose={handleCloseInfoSnackbar} severity="info">
                    You are already in the mailing list
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleCloseErrorSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right',}}>
                <Alert onClose={handleCloseErrorSnackbar} severity="info">
                    You could not be added to the mailing list
                </Alert>
            </Snackbar>
        </>
    )
}