import {
    AppBar,
    Box, Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";
import {useNavigate} from "react-router-dom";


const AppBarCustom = () => {
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        if (path === 'home') path = '/';
        navigate(path);
    };

    return  (<> <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography marginLeft={5} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    ProfitFill
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
    <Drawer
        variant="permanent"
        sx={{
            width: 200,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
        }}
    >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {['Home', 'Create', 'Update'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => {
                            handleClick(text.toLowerCase());
                        }}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Delete'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={()=> {
                            handleClick(text.toLowerCase());
                        }}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>
    </>);
}

export default AppBarCustom;
