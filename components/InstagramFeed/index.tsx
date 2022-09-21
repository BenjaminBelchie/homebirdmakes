import { Divider, ImageList, Stack, Typography, Box } from "@mui/material";
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
            <Box sx={{width:"100%", display:"flex", justifyContent: "center", paddingTop:"55px"}}>
                <Typography variant="subtitle1">HOMEBIRD_MAKES</Typography>
            </Box>
            
            <Stack direction="row" sx={{marginBottom:"8rem", marginTop:"2rem", marginLeft:"2rem", marginRight:"2rem"}} spacing={2}>
                {instaContent.map((post, index) => (
                    <Box key={index} sx={{height:"300px", width:"100%"}}>
                        <ImageButton image={post.img} hoverIcon="/images/instagram.png" imageLocation={post.link}/>
                    </Box>
                    
                ))}
            </Stack>
            
        </Box>
    )
}