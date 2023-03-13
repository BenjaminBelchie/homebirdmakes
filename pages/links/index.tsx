import { Alert, Box, Button, Container, Divider, FormControl, Grid, Menu, MenuItem, Stack, TextField, Typography } from "@mui/material";
import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useState } from "react";
import Footer from "../../components/Footer";
import MailingList from "../../components/MailingList";
import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabase";
import { Database } from "../../lib/database.types";

type LinkType = [Database["public"]["Tables"]["links"]["Row"]]

export const getServerSideProps = async() =>{
    const {data} = await supabase.from("links").select("*");
    console.log(data);
      return{
        props:{data}
      }
    }

const Collection = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return(
        <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
            <PageHeader />
            <Box 
                sx={{
                    maxWidth:"930px", 
                    marginTop:"55px", 
                    display:"flex", 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}>
                    <table className='links-table'>
                        <tbody>
                            {data?.map((link) =>(
                                <tr key={link.id}><td><a className="link" href={link.link}>{link.display_text}</a></td></tr>
                            ))}
                           
                        </tbody>
                    </table>
                <Box sx={{marginTop:6}}>
                    <Footer />
                </Box>
            </Box >
        </Box>
    )
}

export default Collection;