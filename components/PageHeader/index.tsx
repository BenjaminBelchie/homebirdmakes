import { Stack, Box, IconButton, TextField, Button, Menu, MenuItem, Divider } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import router from "next/router"
import React from "react";

export default function PageHeader(){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showSearch, setShowSearch] = React.useState(false)
    const shopMenuOpen = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const openSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        setShowSearch(!showSearch);
    };

    const handleShopMenuClose = () => {
        setAnchorEl(null);
    };

    const handleShopCollectionClick = (e: React.MouseEvent) => {
        router.push(`/collections/${e.currentTarget.dataset.value}`);
    }
    return(
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width: '100%', margin:4}}>
                <Box sx={{display: 'flex', alignItems: 'center', width:"250px"}}>
                    <TextField variant="outlined" placeholder="Search" sx={{display:`${showSearch ? 'block':'none'}`}}/>
                </Box>
                
                <IconButton onClick={() => {router.push("/")}} sx={{padding:0, width:"250px"}}>
                    <Box component="img" src="/images/homebirdmakes_logo.png"  sx={{height: "250px"}}/>
                </IconButton>
                <Box sx={{width:"250px", display:"flex", justifyContent:"flex-end"}}>
                </Box>
                
            </Stack>

            {/* Nav Links */}
            <Stack direction="row" justifyContent="center">
                <Button variant="text" onClick={() => {router.push("/")}}>Home</Button>
                <Button
                    id="basic-button"
                    aria-controls={shopMenuOpen ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={shopMenuOpen ? 'true' : undefined}
                    onClick={() => {window.open("https://www.etsy.com/uk/shop/homebirdmakes")}}
                >Shop</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={shopMenuOpen}
                    onClose={handleShopMenuClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    >
                    <MenuItem data-value="Pumpkins" onClick={handleShopCollectionClick}>Pumpkins</MenuItem>
                    <MenuItem data-value="Peony_Sage" onClick={handleShopCollectionClick}>Peony and Sage</MenuItem>
                    <MenuItem data-value="Cath_Kidson" onClick={handleShopCollectionClick}>Cath Kidson</MenuItem>
                    <MenuItem data-value="Mini_Hangers" onClick={handleShopCollectionClick}>Mini Hangers</MenuItem>
                </Menu>
                
                <Button variant="text" onClick={() => {router.push("/about")}}>About</Button>
                <Button variant="text" onClick={() => {router.push("/contact")}}>Contact</Button>
            </Stack>
            <Divider sx={{width:"100%", marginTop:"47px"}}/>
        </>
    )
}