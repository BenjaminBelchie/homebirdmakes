import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button, Paper, Typography, Stack, Divider, Grid, Box, styled} from '@mui/material';
import moment from 'moment';
import { Router } from 'next/dist/client/router';
import { useRouter } from 'next/router';



export default withPageAuthRequired(function AdminPage({ user }) {
  const router = useRouter();

  const StyledGridBox = (props: any) => (
    <Box
      onClick={() => {router.push(props.location)}}
      sx={{
        height:"100%", 
        width: "100%", 
        display:"flex", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius:6,
        cursor:"pointer",
        backgroundImage:`url(/images/${props.image}), linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.5))`, 
        backgroundBlendMode:"overlay", 
        backgroundSize:"cover", 
        objectFit:"cover", 
        backgroundPosition:"center center" 
      }}>{props.children}</Box>
  )

  const getTime = () => {
      let current_time = moment().format("HH")
      if(parseInt(current_time)<12){
          return "Good Morning";
      }
      else if(parseInt(current_time)>12 && parseInt(current_time)<19){
          return "Good Afternoon";
      }
      else if(parseInt(current_time)>19){
          return "Good Evening";
      }
      else{
          return "";
      }

  }
    return (
      <Paper elevation={2} sx={{height: '100vh', borderRadius:4, padding:6}}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">{getTime()} {user.name}</Typography>
          <Button onClick={() => {router.push("/api/auth/logout")}} variant="contained">Logout</Button>
        </Stack>
        <Divider sx={{marginTop:3, marginBottom:3}} />

        <Grid container spacing={2} sx={{height:"250px"}}>
          <Grid item xs={12} md={8} xl={6}>
            <StyledGridBox image="test1.jpg" location="/admin/products/create"><Typography variant='h5' color="secondary">Add Products</Typography></StyledGridBox>
          </Grid>
          <Grid item xs={12} md={8} xl={6}>
          <StyledGridBox image="test2.jpg" location="/admin/products"><Typography variant='h5' color="secondary">View Products</Typography></StyledGridBox>
          </Grid>
        </Grid>
      </Paper>
      
    );
  });
