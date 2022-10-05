import React from 'react';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Typography
} from '@mui/material'
import { useRouter } from 'next/router';
export default function ImageButton(props: any){
    const router = useRouter();
    const handleClick= () => {
        // Send user to instagram for post
        if(props.imageLocation){
            window.open(props.imageLocation);
        }
        if(props.href){
            window.open(props.href);
        }
    }
    return (
        <Box sx={{width:"100%",height:"100%", backgroundPosition: "center center", backgroundSize:"cover",backgroundRepeat: "no-repeat", backgroundImage:`url(${props.image}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.2))`, backgroundBlendMode:"overlay"}}>
            <Button 
                variant="text" 
                onClick={handleClick}
                sx={{
                    height:"100%", 
                    width:"100%", 
                    ':hover':{backgroundColor:"rgba(255, 255, 255,0.1)", backgroundImage:`url(${props.hoverIcon})`, backgroundPosition: "center center", backgroundRepeat: "no-repeat",}
                }}>
                    <Typography variant="h6" sx={{color:"white", textTransform:"none"}}>{props.category}</Typography>
                </Button>
        </Box>
        
    )
}