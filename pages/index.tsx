import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import {
  Box,
  Typography,
} from '@mui/material';
import ImageButton from '../components/ImageButton';
import InstagramFeed from '../components/InstagramFeed';
import React from 'react';
import { useRouter } from 'next/router';
import ImageListItem, { imageListItemClasses } from "@mui/material/ImageListItem";
import { display } from '@mui/system';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';

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
    category: "Pumpkins",
    href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=29378110"
  },
  {
    image:"https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/peonyandsage1_360x.png?v=1557930739",
    category: "Fabric Baskets",
    href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=22914008"
  },
  {
    image:"https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/cathk1_360x.png?v=1547837918",
    category: "Purses and Pouches",
    href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=21804003"
  },
  {
    image:"https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/il_794xN.1986567859_3oad_360x.jpg?v=1567435990",
    category: "Bookmarks",
    href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=24655291"
  },
  {
    image:"https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/il_794xN.1986567859_3oad_360x.jpg?v=1567435990",
    category: "Large Zip Bags",
    href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=37258436"
  },
  {
    image:"https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/il_794xN.1986567859_3oad_360x.jpg?v=1567435990",
    category: "Garlands",
    href:"https://www.etsy.com/uk/shop/homebirdmakes?section_id=23547704"
  },
]


const Home: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  
  
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {/* Top logo and icons */}
      <PageHeader />

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
          <ImageListItem key={item.image} sx={{width:"350px", height:"350px !important"}}>
            <ImageButton key={index} image={item.image} category={item.category} href={item.href}/>
        </ImageListItem>
        ))}
      </Box>
    {/* </ThemeProvider> */}

      <InstagramFeed />

      <Footer />
      
      
    </Box>
  )
}

export default Home
