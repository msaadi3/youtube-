import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export const MyDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Drawer
        sx={{ bgcolor: '#000000' }}
        variant='persistent'
        open={isDrawerOpen}
      >
        <Toolbar
          sx={{
            // background: 'transparent',
            bgcolor: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: [1],
            color: 'white',
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon color='primary' />
          </IconButton>
        </Toolbar>
        <Divider />
        <List sx={{ bgcolor: 'black' }}>
          {['Home', 'Shorts', 'Subscriptions'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            bgcolor: 'black',
            flex: '1' /* , flexGrow:'1', height:'100vh'*/,
          }}
        ></Box>
      </Drawer>
    </>
  );
};
