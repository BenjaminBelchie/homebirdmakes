import { Divider, ImageList, Stack, Typography, Box, ImageListItem, imageListItemClasses } from "@mui/material";
import { useEffect, useState } from "react";
import ImageButton from "../ImageButton";
import InstagramIcon from '@mui/icons-material/Instagram';

const instaContent = [
    {
        img:'/images/instagram/img1.jpg',
        link:"https://www.instagram.com/p/Cio8HO_Kzh9/"
    },
    {
        img:'/images/instagram/img2.jpg',
        link:"https://www.instagram.com/p/CdaG3sKqwqQ/",
    },
    {
        img:'/images/instagram/img3.jpg',
        link:"https://www.instagram.com/p/CdKqLHDqYrg/"
    },
    {
        img:'/images/instagram/img4.jpg',
        link:"https://www.instagram.com/p/Cbo3IdeqBu4/"
    },
    {
        img:'/images/instagram/img5.jpg',
        link:"https://www.instagram.com/p/CVXOLAEKVw_/",
    },
    {
        img:'/images/instagram/img6.jpg',
        link:"https://www.instagram.com/p/CS_PvDmq20Y/"
    }
]

export default function InstagramFeed(){
    return(
        <Box sx={{width:"100vw"}}>
            <Divider sx={{marginTop:2, marginBottom:2, width:"100%"}}><Typography variant="subtitle1">Instagram</Typography></Divider>
            <Box sx={{width:"100%", display:"flex", justifyContent: "center", alignItems: "center", paddingTop:"55px"}}>
                <InstagramIcon sx={{fontSize:"16px", marginRight:1}} />
                <Typography variant="subtitle1">HOMEBIRD_MAKES</Typography>
            </Box>

            <Box
                sx={{
                marginTop:"55px",
                display: "grid",
                marginBottom:"71px", 
                marginTop:"2rem", 
                marginLeft:"2rem", 
                marginRight:"2rem",
                gridTemplateColumns: {
                    mobile: "repeat(1, 1fr)",
                    bigMobile: "repeat(1, 1fr)",
                    tablet: "repeat(3, 1fr)",
                    desktop: "repeat(6, 1fr)",
                    gap: "2rem"
                },
                [`& .${imageListItemClasses.root}`]: {
                    display: "flex",
                    flexDirection: "column"
                }
                }}
            >
                {instaContent.map((post, index) => (
                <ImageListItem key={index} sx={{width:"100%", height:"300px !important"}}>
                        <ImageButton image={post.img} hoverIcon="/images/instagram.png" imageLocation={post.link}/>
                </ImageListItem>
                ))}
            </Box>
        </Box>
    )
}