import { Box, Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { getCsrfToken, getProviders, useSession } from "next-auth/react"
import Head from "next/head";
import React from "react";

export default function SignOut({ csrfToken }) {
  return (
    <>
      <Head>
        <title>Logout</title>
      </Head>
      <div style={{minHeight:"100vh", backgroundSize:"100%"}}>
          <Box sx={{height:"100vh",display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Paper elevation={2} sx={{padding:4, borderRadius:4}}>
                  <Stack spacing={2} direction="column" alignItems="center">
                      <Typography variant="h4">Signout</Typography>
                      <Typography variant="h6">Are you sure you want to sign out?</Typography>
                      <form action="http://localhost:3000/api/auth/signout" method="POST">
                          <input type="hidden" name="csrfToken" value={csrfToken} />
                          <Button variant="outlined" color="info" type="submit">
                              <Box sx={{height:"20px", width:"20px", marginRight:1}} component="img" src="/images/microsoftLogo.svg"/>Sign out
                          </Button>
                      </form>
                  </Stack>
              </Paper>
          </Box>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const csrfToken = await getCsrfToken({req})
  
    // if (session) {
    //   return {
    //     redirect: { destination: "/" },
    //   };
    // }
    return {
      props: { csrfToken },
    }
  }