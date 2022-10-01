import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Stack, Box, Typography, Divider, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

type Props = {
    open:boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    categories:any[]
}

export default function EditCategoriesDialog(props:Props){
    const [addCategory, setAddCategory] = useState(false);

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleAddCategory = () => {
        setAddCategory(true);
    }

    return(
        <div>
        <Dialog open={props.open} onClose={handleClose} PaperProps={{
            style:{
                width: '600px',
            }
        }}>
            <DialogTitle>
                Current Categories
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
                </DialogTitle>
            <DialogContent>
                <Divider sx={{marginBottom:2, width:"100%"}} />
                <Stack direction="column" spacing={2}>
                    {props.categories.map((category) => {
                        return(
                            <Stack key={category.id} direction="row" sx={{justifyContent:"space-between"}}>
                                <Typography variant="body1" color="primary">{category.category}</Typography>
                                <Button color="error" variant="contained">Remove</Button>
                            </Stack>
                        )
                    })}
                    {props.categories.length >= 4 ? <></>: 
                        <>
                            <Button variant="contained" color="success" sx={{width:"fit-content"}} onClick={handleAddCategory}>Add Category</Button>
                            {addCategory ?
                                <>
                                    <TextField variant="standard" color="primary" label="Category Name"/>
                                </>
                                : <></>
                            }
                        </>
                    }
                </Stack>
                <Divider sx={{marginTop:2,marginBottom:1, width:"100%"}} />
                <Typography variant="caption" color="error">(Max 6)</Typography>
            </DialogContent>
        </Dialog>
        </div>
    )
}