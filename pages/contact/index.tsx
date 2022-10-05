import { Alert, Box, Button, Container, Divider, FormControl, Grid, Menu, MenuItem, Snackbar, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useState } from "react";
import Footer from "../../components/Footer";
import MailingList from "../../components/MailingList";
import PageHeader from "../../components/PageHeader";

export const getServerSideProps: GetServerSideProps = async(context) =>{
      return{
        props:{null: null}
      }
    }

const Collection: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [errorState, setErrorState] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorSnackbarState, setErrorSnackbarState] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
    };

    const handleErrorSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setErrorSnackbarState(false);
    }

    const isValidEmail = (email: string) => {  
        return  /\S+@\S+\.\S+/.test(email);
    }

    const sendMessage = () => {
        if(name !== "" && email !== "" && message !== ""){ 
            setLoading(true);
            axios.post('/api/email/contact',{
                name:name,
                email:email,
                phone:phone,
                message:message
            }).then(response => {
                if(response.data.success) {
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                    setOpen(true);
                    setLoading(false);
                }
                else{
                    setErrorSnackbarState(true);
                    setLoading(false);
                }
            })
        } else{
            setErrorState(true);
        }
        console.log(name, email, phone, message);
    }

    return(
        <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
            }}>
          <PageHeader />
          <Box 
            sx={{
                maxWidth:"930px", 
                marginTop:"55px", 
                display:"flex", 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                padding:4,
            }}>
            <Typography variant="h5" sx={{marginBottom:"55px"}}>Contact</Typography>
            <Typography 
                variant="body1">
                    {`If you would like to get in touch please do email me at alibelcher@aol.com, and I'll get back to you as soon as I can.`}
            </Typography>

            {errorState ?
                <Alert sx={{marginTop:"35px"}} severity="error">Please complete all required fields</Alert>
                : <></>
            }

            <Stack 
                direction="column" 
                spacing={2}
                sx={{
                    marginTop:"35px", 
                    width:"100%"
                }}>
                <Stack 
                    direction="row" 
                    spacing={2}
                    sx={{width:"100%"}}>

                    <TextField 
                        required 
                        error={errorState}
                        variant="outlined"
                        label="Name" 
                        value={name} 
                        disabled={loading}
                        onChange={(e) => {
                            setName(e.target.value); 
                            setErrorState(false);
                        }} 
                        sx={{width:"100%"}} 
                        InputLabelProps={{ shrink: true }}/>

                    <TextField 
                        required 
                        error={errorState}
                        variant="outlined" 
                        label="Email" 
                        disabled={loading}
                        value={email} 
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorState(false);
                        }} 
                        sx={{width:"100%"}} 
                        InputLabelProps={{ shrink: true }}/>
                </Stack>
                <TextField 
                    variant="outlined"
                    label="Phone Number" 
                    value={phone} 
                    disabled={loading}
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }} 
                    sx={{width:"100%"}} 
                    InputLabelProps={{ shrink: true }}/>

                <TextField 
                    required 
                    error={errorState}
                    variant="outlined" 
                    label="Message" 
                    disabled={loading}
                    value={message} 
                    onChange={(e) => {
                        setMessage(e.target.value);
                        setErrorState(false);
                    }} 
                    multiline 
                    rows={6} 
                    sx={{width:"100%"}} 
                    InputLabelProps={{ shrink: true }}/>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    sx={{color:"white", boxShadow:"none"}} 
                    disabled={!isValidEmail(email)|| loading} 
                    onClick={sendMessage}>Send</Button>
            </Stack>
            
          </Box>
          <Box sx={{marginTop:6}}>
                <Footer />
            </Box>

            <Snackbar
                open={open} 
                autoHideDuration={6000} 
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}>
                <Alert onClose={handleClose} severity="success">
                Email Sent
                </Alert>
            </Snackbar>

            <Snackbar
                open={errorSnackbarState} 
                autoHideDuration={6000} 
                onClose={handleErrorSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}>
                <Alert onClose={handleErrorSnackbarClose} severity="error">
                Error Sending Email
                </Alert>
            </Snackbar>
         
        </Box >
    )
}

export default Collection;