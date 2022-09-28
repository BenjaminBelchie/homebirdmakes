import { Box, Button, Container, Divider, Grid, Menu, MenuItem, Typography, Stack } from "@mui/material";
import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import MailingList from "../../components/MailingList";
import PageHeader from "../../components/PageHeader";

export const getServerSideProps: GetServerSideProps = async(context) =>{
      return{
        props:{null: null}
      }
    }

const Collection: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const para1 = "Hello and welcome to Homebird Makes, I'm Ali I love to design and create useful and pretty home accessories from my home studio in Staffordshire. I'm orginally from Hertfordshire but moved to the midlands after I was married over 20 years ago now.";
    const para2 = "I started sewing quite a few years ago as a hobby when my children were small, I made cushions and gifts for family and friends.  After I while I decided to open my own Etsy shop to see if any of my makes would sell. I have slowly built up my Etsy shop over the years and decided it was time to have my own website along side Etsy.";
    const para3 = "You can visit my Etsy shop to see other lovely makes to buy as well as read the lots of 5 star reviews I have received and am proud of."
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
         <PageHeader />

        <Box sx={{maxWidth:"930px", display:"flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h5" sx={{marginTop:"55px", marginBottom:"55px"}}>About</Typography>
            <Stack spacing={2}>
                <Typography variant="body1">{para1}</Typography>
                <Typography variant="body1">{para2}</Typography>
                <Typography variant="body1">{para3}</Typography>
            </Stack>
            <Box sx={{marginTop:4, marginBottom:2}} component="img" src="/images/Ali.jpg"/>
            <Typography variant="body1">My lovely work room, I am lucky to have a space to call my own.</Typography>
            <Stack direction="row" spacing={2} sx={{marginTop:2}}>
                <Box component="img" src="/images/Room1.jpg"/>
                <Box component="img" src="/images/Room2.jpg"/>
            </Stack>
            
        </Box>
        <Box sx={{marginTop:6}}>
            <MailingList />
        </Box>
            
        </Box >
    )
}

export default Collection;