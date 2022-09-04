import React from 'react';
import {
    Box,
    Button,
    Card,
    CardMedia
} from '@mui/material'
export default function ImageButton(props: any){
    return (
        // <Card>
        //     <CardMedia component="img" height="200" image={props.image}/>
        //     
        //         <Button variant="text">{props.category}</Button>
        // </Card>

        <Box sx={{width:"100%",height:"100%", backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundImage:`url(${props.image}`}}>
            <Button variant="text" sx={{height:"100%", width:"100%"}}>{props.category}</Button>
        </Box>
        
    )
}