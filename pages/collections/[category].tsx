import { Box, Button, Container, Divider, Grid, Menu, MenuItem, Typography } from "@mui/material";
import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import prisma from "../../lib/prisma";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PopupMenu from "../../components/PopupMenu";

export const getServerSideProps: GetServerSideProps = async({params}) =>{
      console.log(params?.category);
      return{
        props:{category: params?.category}
      }
    }

const Collection: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return(
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <PageHeader />
          <Box sx={{width:"100%",height:"300px",display:"flex", justifyContent: 'center', alignItems: 'center', backgroundPosition: "center center", backgroundSize:"cover",backgroundRepeat: "no-repeat", backgroundImage:`url(https://cdn.shopify.com/s/files/1/0014/1269/4073/collections/il_794xN.2560737347_gafl.jpg?v=1613653847}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.2))`, backgroundBlendMode:"overlay"}}>
            <Typography variant="h4" sx={{color:"white"}}>{props.category}</Typography>
          </Box>
          <Box sx={{minWidth:"1100px", margin:4}}>
            <Typography variant="body1" color="primary">This is some test content</Typography>
          </Box>
          <Divider sx={{ marginBottom:1, width:"100%"}}/>

          {/* FIlter and Sort component */}
          <Box sx={{display: "flex", minWidth:"1100px", justifyContent: "space-between", alignItems:"center"}}>
          <PopupMenu 
            menuItems={[
              {
                title:"Autumnal Decor",
                value:"Autumnal_Decor"
              },
              {
                title:"Liberty Fabric Pattern",
                value:"Liberty_Fabric_Pattern"
              },
              {
                title:"Liberty Mustard Capel Pumpkin",
                value:"Liberty_Mustard_Capel_Pumpkin"
              },
              {
                title:"Pumpkin Decoration",
                value:"Pumpkin_Decoration"
              },
            ]}
            buttonText="Filter"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            itemFontSize="12px" />

            <Typography sx={{fontStyle:"italic"}} variant="body2">X Products</Typography>

            <PopupMenu 
              menuItems={[
                {
                  title:"Featured",
                  value:"Featured"
                },
                {
                  title:"Alphabetically A-Z",
                  value:"Alphabetically_A_Z"
                },
                {
                  title:"Alphabetically Z-A",
                  value:"Alphabetically_Z_A"
                },
                {
                  title:"Price, Low to High",
                  value:"Low_To_High"
                },
                {
                  title:"Price, High to Low",
                  value:"High_To_Low"
                },
                {
                  title:"Date, New to Old",
                  value:"New_To_Old"
                },
                {
                  title:"Date, Old to New",
                  value:"Old_To_New"
                },
              ]}
              buttonText="Sort"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              itemFontSize="12px" />
          </Box>
          <Divider sx={{marginBottom:2, marginTop:1, width:"100%"}} />
         
        </Box >
    )
}

export default Collection;