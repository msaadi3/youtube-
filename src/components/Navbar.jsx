import React, { useState } from 'react';
import youtubeLogo from '../assets/YouTube.svg';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useChecked } from '../CheckedContext.jsx';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Navbar = () => {
  const [state, setState] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state) {
      navigate(`search/${state}`);
    }
  };

  // toggle button for distraction free youtube
  const { checked, setChecked } = useChecked();
  const handleChange = (event) => {
    // setChecked(event.target.checked);
    setChecked(!checked);
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
      <Link to='/'>
        <Box
          component='img'
          sx={{
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
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label={`${checked ? 'Full YouTube' : 'Distraction free YouTube'}`}
        />
      </FormGroup>
    </Box>
  );
};

export default Navbar;
