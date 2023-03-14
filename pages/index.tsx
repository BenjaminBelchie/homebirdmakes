import type { InferGetServerSidePropsType } from 'next'
import {
  Box,
  Typography,
} from '@mui/material';
import ImageButton from '../components/ImageButton';
import React from 'react';
import ImageListItem, { imageListItemClasses } from "@mui/material/ImageListItem";
import PageHeader from '../components/PageHeader';
import dynamic from "next/dynamic";
import { useQuery } from 'react-query';
import { supabase } from "../lib/supabase";
const InstagramFeed = dynamic(()=> import('../components/InstagramFeed'))
const Footer = dynamic(()=> import('../components/Footer'))

export const getServerSideProps = async() =>{
    const {data} = await supabase.from("collections").select("*");
    
    return{
      props:{data}
    }
  }

const Home = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {/* Top logo and icons */}
      <PageHeader />

      <Typography variant="body1" sx={{marginTop:8}}>COLLECTIONS</Typography>
        <Box
          sx={{
            marginTop:"55px",
            display: "grid",
            gridTemplateColumns: {
              mobile: "repeat(1, 1fr)",
              bigMobile: "repeat(1, 1fr)",
              tablet: "repeat(2, 1fr)",
              desktop: "repeat(3, 1fr)",
              gap: "2rem"
            },
            [`& .${imageListItemClasses.root}`]: {
              display: "flex",
              flexDirection: "column"
            }
          }}
        >
          {data?.map((item, index) => (
            <ImageListItem key={item.image} sx={{width:"350px", height:"350px !important"}}>
              <ImageButton key={index} image={`${item.image}`} category={item.category} href={item.etsy_link}/>
          </ImageListItem>
          ))}
          
        </Box>

        <InstagramFeed />

        <Footer />
        
        
      </Box>
  )
}

export default Home
