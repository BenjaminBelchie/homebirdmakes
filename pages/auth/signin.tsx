import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { getProviders, getSession, signIn } from "next-auth/react"
import Head from "next/head";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>
      <div style={{minHeight:"100vh", backgroundSize:"100%"}}>
        {Object.values(providers).map((provider) => (
          <Box key={provider.name} sx={{height:"100vh",display:"flex", alignItems: "center", justifyContent: "center"}}>
            <Paper elevation={2} sx={{padding:4, borderRadius:4}}>
            <Stack spacing={2} direction="column" alignItems="center">
              <Button variant="contained" color="info" onClick={() => signIn(provider.id)}>
                <Box sx={{height:"20px", width:"20px", marginRight:1}} component="img" src="/images/fb_white_logo.png"/> Continue with Facebook 
              </Button>
            </Stack>
            
          </Paper>
          </Box>
          
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/admin" },
    };
  }
  return {
    props: { providers },
  }
}