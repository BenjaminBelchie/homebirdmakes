import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button, Paper, Typography, Stack, Divider, Grid, Box, styled} from '@mui/material';
import moment from 'moment';
import { Router } from 'next/dist/client/router';
import { useRouter } from 'next/router';
import { useState } from 'react';
import EditCategoriesDialog from '../../components/EditCategoriesDialog';



export default withPageAuthRequired(function AdminPage({ user }) {
  const router = useRouter();
  const [editCategoriesOpen, setEditCategoriesOpen] = useState(false);

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

  const handleEditCategoryClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("Test");
    setEditCategoriesOpen(true);
  }

    return (
      <Paper className="adminPaper" elevation={2} sx={{height: '100vh', borderRadius:4, padding:6}}>
        {/* <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">{getTime()} {user.name}</Typography>
          <Button onClick={() => {router.push("/api/auth/logout")}} variant="contained">Logout</Button>
        </Stack> */}
        <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
          <Grid item xs={6} md={8}>
            <Typography className="adminText">{getTime()} {user.name}</Typography>
          </Grid>

          <Grid item xs={6} md={6}>
            <Button onClick={() => {router.push("/api/auth/logout")}} variant="contained">Logout</Button>
          </Grid>
        </Grid>
        <Divider sx={{marginTop:3, marginBottom:3}} />

        <Stack direction="row" justifyContent="space-between">
          <Box onClick={handleEditCategoryClicked}sx={{height:"300px", width:"600px",borderRadius:4 ,backgroundPosition: "center center", backgroundSize:"cover",backgroundRepeat: "no-repeat", cursor:"pointer", backgroundImage:`url(/images/instagram/img5.jpg), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`, backgroundBlendMode:"overlay"}}>
            <Box sx={{height:"100%", width:"100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Typography variant="h4" sx={{color:"white"}}>Edit Categories</Typography>
            </Box>
            
          </Box>
        </Stack>
        <EditCategoriesDialog open={editCategoriesOpen} setOpen={setEditCategoriesOpen} categories={[{category: "Test1", id:1},{category: "Test2", id:2},{category: "Test3", id:3}]}/>
      </Paper>
      
    );
  });
