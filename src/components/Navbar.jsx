import React, { useState } from 'react';
import youtubeLogo from '../assets/YouTube.svg';
import { MyDrawer } from '../muiComponents/MyDrawer';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [state, setState] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state) {
      navigate(`search/${state}`);
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        padding: '0 1rem',
        position: 'sticky',
        top: '0',
        zIndex: '1',
        backgroundColor: 'black',
        mb: 2,
      }}
    >
      <IconButton onClick={handleDrawerOpen}>
        <MenuIcon color='primary' />
      </IconButton>
      <MyDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Link to='/'>
        <Box
          component='img'
          sx={{
            // height: 233,
            // width: 350,
            height: '10vh',
            width: '7.5rem',
            cursor: 'pointer',
            mt: { xs: 1, md: 0 },
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            ml: { xs: 1, md: 1 },
          }}
          alt='youtube logo.'
          src={youtubeLogo}
        />
      </Link>
      <Paper
        component='form'
        onSubmit={handleSubmit}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          bgcolor: 'black',
          color: 'white',
          margin: 'auto',
          // borderRadius: 20,
          // border: '1px solid #e3e3e3',
          // border: '1px solid white',
          // borderRadius: '35px',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: 'white' }}
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <IconButton
          type='button'
          sx={{ p: '10px' }}
          aria-label='search'
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default Navbar;
