import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailingList from "../MailingList";
import CopyrightIcon from '@mui/icons-material/Copyright';
import PinterestIcon from '@mui/icons-material/Pinterest';

export default function Footer(){
    return(
        <div className="footer">
            <Divider sx={{width: '100%', marginTop: 2, marginBottom:2}} />
            <Stack direction="row" sx={{marginBottom:2}}>
                <IconButton onClick={() => {window.open("https://www.facebook.com/homebirdmakes/")}}>
                    <Avatar sx={{bgcolor:'#3B5998'}}><FacebookIcon/></Avatar>
                </IconButton>
                <IconButton onClick={() =>{window.open("https://www.instagram.com/homebird_makes/")}}>
                    <Avatar sx={{background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'}}><InstagramIcon/></Avatar>
                </IconButton>
                <IconButton onClick={() => {window.open("https://www.pinterest.co.uk/homebirdmakes/")}}>
                    <Avatar sx={{bgcolor: '#E60023'}}><PinterestIcon/></Avatar>
                </IconButton>
            </Stack>
            <MailingList />
            {/* <Box>
                <Stack direction="row" sx={{marginBottom:4}}><CopyrightIcon sx={{color:"#383838"}} /><Typography variant="body1" sx={{color:"#383838"}}> Homebirdmakes</Typography></Stack>
            </Box> */}
        </div>

    )
}