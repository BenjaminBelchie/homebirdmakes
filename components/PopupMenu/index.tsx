import { Button, Menu, MenuItem, PopoverOrigin } from "@mui/material"
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type Props = {
    menuItems:any[];
    buttonText:string;
    anchorOrigin:PopoverOrigin;
    transformOrigin:PopoverOrigin;
    itemFontSize:string;
}

export default function PopupMenu(props:Props){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
  
      const handleMenuClose = () => {
        setAnchorEl(null);
      };
    return(
        <>
        <Button
            id="basic-button"
            aria-controls={menuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon/>}
        >Filter</Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={props.anchorOrigin}
            transformOrigin={props.transformOrigin}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            >
                {props.menuItems.map((item, index) => {
                    return(
                        <MenuItem key={index} data-value={item.value} sx={{fontSize:props.itemFontSize}}>{item.title}</MenuItem>
                    )
                })}
        </Menu>
        </>
        
    )
}