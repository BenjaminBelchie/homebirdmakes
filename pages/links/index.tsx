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
                    <table className='links-table'>
                        <tbody>
                            <tr><td><a className="link" href="https://www.etsy.com/uk/shop/homebirdmakes">Etsy Shop</a></td></tr>
                            <tr><td><a className="link" href="https://www.subscribepage.com/homebirdmakes-newsletter-sign-up">Subscribe to newsletter</a></td></tr>
                            <tr><td><a className="link" href="https://www.etsy.com/uk/shop/homebirdmakes?ref=seller-platform-mcnav&section_id=28243644">Sale Page</a></td></tr>
                            <tr><td><a className="link" href="https://homebirdmakes.vercel.app/">Website</a></td></tr>
                            <tr><td><a className="link" href="https://www.pinterest.co.uk/homebirdmakes/">Pinterest</a></td></tr>
                            <tr><td><a className="link" href="https://www.facebook.com/homebirdmakes">Facebook</a></td></tr>
                        </tbody>
                    
                        
                        
                        
                        
                        
                    </table>
                <Box sx={{marginTop:6}}>
                    <Footer />
                </Box>
            </Box >
        </Box>
    )
}

export default Collection;