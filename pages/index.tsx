import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import {
  Box,
  Typography,
  Stack,
  IconButton,
  ImageList,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Menu,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import ImageButton from '../components/ImageButton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InstagramFeed from '../components/InstagramFeed';
import React from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchAnchorEl, setSearchAnchorEl] = React.useState<null | HTMLElement>(null);
  const shopMenuOpen = Boolean(anchorEl);
  const searchMenuOpen = Boolean(searchAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const closeSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSearchAnchorEl(null);
  };
  const handleShopMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShopCollectionClick = (e: React.MouseEvent) => {
    router.push(`/collection/${e.currentTarget.dataset.value}`);
  }
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {/* Top logo and icons */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width: '100%', margin:4}}>
        <IconButton 
          sx={{marginLeft:4, height:"fit-content"}}
          onClick={openSearch}>
          <SearchIcon/>
        </IconButton>
          <Menu
              id="basic-menu"
              anchorEl={searchAnchorEl}
              open={searchMenuOpen}
              onClose={closeSearch}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem><Stack direction="row"><TextField variant="standard" label="Search Products"/><Button variant="contained" size="small">Search</Button></Stack></MenuItem>
            </Menu>
        <IconButton onClick={() => {router.push("/")}} sx={{padding:0}}>
          <Box component="img" src="/images/homebirdmakes_logo.png"  sx={{height: "250px"}}/>
        </IconButton>
        
        <IconButton sx={{marginRight:4, height:"fit-content"}}>
          <FavoriteIcon/>
        </IconButton>
      </Stack>

      {/* Nav Links */}
      <Stack direction="row" justifyContent="center">
          <Button variant="text">Home</Button>
          <Button
            id="basic-button"
            aria-controls={shopMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={shopMenuOpen ? 'true' : undefined}
            onClick={handleClick}
          >Shop</Button>
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={shopMenuOpen}
              onClose={handleShopMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem data-value="Pumpkins" onClick={handleShopCollectionClick}>Pumpkins</MenuItem>
              <MenuItem data-value="Peony_Sage" onClick={handleShopCollectionClick}>Peony and Sage</MenuItem>
              <MenuItem data-value="Cath_Kidson" onClick={handleShopCollectionClick}>Cath Kidson</MenuItem>
              <MenuItem data-value="Mini_Hangers" onClick={handleShopCollectionClick}>Mini Hangers</MenuItem>
              </Menu>
          
          <Button variant="text">About</Button>
          <Button variant="text">Contact</Button>
      </Stack>

      <Typography variant="body1" sx={{marginTop:8}}>Collections</Typography>
      
      <ImageList sx={{ width: "80%", height:800, margin:4 }} cols={3} rowHeight={250}>
        {testData.map((item, index) => <ImageButton key={index} image={item.image} category={item.category}/>)}
      </ImageList>
      <InstagramFeed />
      
      
    </Box>
  )
}

export default Home
