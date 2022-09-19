import { Divider, ImageList, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ImageButton from "../ImageButton";



export default function InstagramFeed(){
    return(
        <>
            <Divider sx={{marginTop:2, marginBottom:2, width:"100%"}}><Typography variant="body2">Social Feed</Typography></Divider>
            
        </>
    )
}