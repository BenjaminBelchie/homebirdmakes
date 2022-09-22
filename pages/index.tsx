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
  Divider,
  useMediaQuery,
  createTheme,
  ThemeProvider,
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
import ImageListItem, { imageListItemClasses } from "@mui/material/ImageListItem";
import { display } from '@mui/system';
import MailingList from '../components/MailingList';

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
    image:"https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/il_794xN.2560737347_gafl_360x.jpg?v=1613653847",
    category: "Pumpkins"
  },
  {
    image:"https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/peonyandsage1_360x.png?v=1557930739",
    category: "Peony and Sage"
  },
  {
    image:"https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/cathk1_360x.png?v=1547837918",
    category: "Cath Kidson"
  },
  {
    image:"https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/il_794xN.1986567859_3oad_360x.jpg?v=1567435990",
    category: "Mini Hangers"
  },
]

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       mobile: 0,
//       bigMobile: 350,
//       tablet: 650,
//       desktop: 900
//     }
//   }
// });

const Home: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showSearch, setShowSearch] = React.useState(false)
  const shopMenuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowSearch(!showSearch);
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
        <Box sx={{display: 'flex', alignItems: 'center', width:"250px"}}>
          <IconButton 
            sx={{marginLeft:4, height:"fit-content"}}
            onClick={openSearch}>
            <SearchIcon/>
          </IconButton>
          <TextField variant="outlined" placeholder="Search" sx={{display:`${showSearch ? 'block':'none'}`}}/>
        </Box>
        
        <IconButton onClick={() => {router.push("/")}} sx={{padding:0, width:"250px"}}>
          <Box component="img" src="/images/homebirdmakes_logo.png"  sx={{height: "250px"}}/>
        </IconButton>
        <Box sx={{width:"250px", display:"flex", justifyContent:"flex-end"}}>
          <IconButton sx={{marginRight:4, height:"fit-content"}}>
          <FavoriteIcon/>
        </IconButton>
        </Box>
        
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
      <Divider sx={{width:"100%", marginTop:"47px"}}/>

      <Typography variant="body1" sx={{marginTop:8}}>COLLECTIONS</Typography>

      {/* <ThemeProvider theme={theme}> */}
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
        {testData.map((item, index) => (
          <ImageListItem key={item.img} sx={{width:"350px", height:"350px !important"}}>
            <ImageButton key={index} image={item.image} category={item.category}/>
        </ImageListItem>
        ))}
      </Box>
    {/* </ThemeProvider> */}

      <InstagramFeed />

      <MailingList />
      
      
    </Box>
  )
}

export default Home
