import { Box, Button, Container, Divider, Grid, Menu, MenuItem, Typography } from "@mui/material";
import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import prisma from "../../lib/prisma";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const getServerSideProps: GetServerSideProps = async({params}) =>{
      console.log(params?.category);
      return{
        props:{null: null}
      }
    }

const Collection: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [filterSelectAnchorEl, setFilterSelectAnchorEl] = useState<null | HTMLElement>(null);
    const filterMenuOpen = Boolean(filterSelectAnchorEl);

    const [sortSelectAnchorEl, setSortSelectAnchorEl] = useState<null | HTMLElement>(null);
    const sortMenuOpen = Boolean(sortSelectAnchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setFilterSelectAnchorEl(event.currentTarget);
    };

    const handleFilterMenuClose = () => {
      setFilterSelectAnchorEl(null);
    };

    const handleOpenSortMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setSortSelectAnchorEl(event.currentTarget);
    };

    const handleCloseSortMenu = () => {
      setSortSelectAnchorEl(null);
    };

    return(
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <PageHeader />
          <Box sx={{width:"100%",height:"300px", backgroundPosition: "center center", backgroundSize:"cover",backgroundRepeat: "no-repeat", backgroundImage:`url(${props.image}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.2))`, backgroundBlendMode:"overlay"}}/>
          <Box sx={{minWidth:"1100px", margin:4}}>
            <Typography variant="body1" color="primary">This is some test content</Typography>
          </Box>
          <Divider sx={{ marginBottom:1, width:"100%"}}/>

          {/* FIlter and Sort component */}
          <Box sx={{display: "flex", minWidth:"1100px", justifyContent: "space-between", alignItems:"center"}}>
            <Button
                id="basic-button"
                aria-controls={filterMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={filterMenuOpen ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon/>}
            >Filter</Button>
            <Menu
                id="basic-menu"
                anchorEl={filterSelectAnchorEl}
                open={filterMenuOpen}
                onClose={handleFilterMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                >
                <MenuItem data-value="Pumpkins">Pumpkins</MenuItem>
                <MenuItem data-value="Peony_Sage" >Peony and Sage</MenuItem>
                <MenuItem data-value="Cath_Kidson" >Cath Kidson</MenuItem>
                <MenuItem data-value="Mini_Hangers" >Mini Hangers</MenuItem>
            </Menu>

            <Typography sx={{fontStyle:"italic"}} variant="body2">X Products</Typography>

            <Button
                id="basic-button"
                aria-controls={sortMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={sortMenuOpen ? 'true' : undefined}
                onClick={handleOpenSortMenu}
                endIcon={<KeyboardArrowDownIcon/>}
            >Sort</Button>
            <Menu
                id="basic-menu"
                anchorEl={sortSelectAnchorEl}
                open={sortMenuOpen}
                onClose={handleCloseSortMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                >
                <MenuItem data-value="Pumpkins">Pumpkins</MenuItem>
                <MenuItem data-value="Peony_Sage" >Peony and Sage</MenuItem>
                <MenuItem data-value="Cath_Kidson" >Cath Kidson</MenuItem>
                <MenuItem data-value="Mini_Hangers" >Mini Hangers</MenuItem>
            </Menu>
          </Box>
          <Divider sx={{marginBottom:2, marginTop:1, width:"100%"}} />
         
        </Box >
    )
}

export default Collection;