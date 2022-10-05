import { Alert, Box, Button, Container, Divider, FormControl, Grid, Menu, MenuItem, Stack, TextField, Typography } from "@mui/material";
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

    const sendMessage = () => {
        if(name !== "" && email !== "" && message !== ""){ 

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
                alignItems: 'center'
            }}>
          <PageHeader />
          <Box 
            sx={{
                maxWidth:"930px", 
                marginTop:"55px", 
                display:"flex", 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
            <Typography variant="h5" sx={{marginBottom:"55px"}}>Contact</Typography>
            <Typography 
                variant="body1">
                    If you would like to get in touch please do email me at alibelcher@aol.com, and I&#39ll get back to you as soon as I can.
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
                    onClick={sendMessage}>Send</Button>
            </Stack>
            
          </Box>
          <Box sx={{marginTop:6}}>
                <Footer />
            </Box>
         
        </Box >
    )
}

export default Collection;