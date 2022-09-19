import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import {
  Box,
  Typography,
  Stack,
  IconButton,
  ImageList,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import ImageButton from '../components/ImageButton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InstagramFeed from '../components/InstagramFeed';

export const getServerSideProps: GetServerSideProps = async(context) =>{
  // let etsyListings = null;
  // axios.get('https://api.etsy.com/v3/application/openapi-ping',{
  //   headers: {
  //     'x-api-key': process.env.ETSY_API_KEY!
  //   }
  // }).then(response => {
  //   console.log(response)
  //   etsyListings = response.data;
  // }).catch(error => {
  //   console.log(error);
  // })
    
    return{
      props:{null: null}
    }
  }

const testData = [
  {
    image:"https://source.unsplash.com/gySMaocSdqs/600x300",
    category: "Pumpkins"
  },
  {
    image:"https://source.unsplash.com/gySMaocSdqs/600x300",
    category: "Pumpkins"
  },
  {
    image:"https://source.unsplash.com/gySMaocSdqs/600x300",
    category: "Pumpkins"
  },
  {
    image:"https://source.unsplash.com/gySMaocSdqs/600x300",
    category: "Pumpkins"
  },
  {
    image:"https://source.unsplash.com/gySMaocSdqs/600x300",
    category: "Pumpkins"
  },
  {
    image:"https://source.unsplash.com/gySMaocSdqs/600x300",
    category: "Pumpkins"
  }
]

const Home: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {/* Top logo and icons */}
      <Stack direction="row" justifyContent="space-between" sx={{width: '100%', margin:4}}>
        <IconButton sx={{marginLeft:4}}>
          <SearchIcon/>
        </IconButton>
        <Typography variant="h1">Homebird makes</Typography>
        <IconButton sx={{marginRight:4}}>
          <FavoriteIcon/>
        </IconButton>
      </Stack>

      {/* Nav Links */}
      <Stack direction="row" justifyContent="center">
          <Button variant="text">Home</Button>
          <Button variant="text">Shop</Button>
          <Button variant="text">About</Button>
          <Button variant="text">Contact</Button>
      </Stack>

      <Typography variant="body1" sx={{marginTop:8}}>Collections</Typography>
      
      <InstagramFeed />
      
      
    </Box>
  )
}

export default Home
