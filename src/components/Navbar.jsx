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
import CloseIcon from '@mui/icons-material/Close'; // To close search on small screens
import { useMediaQuery } from '@mui/material';

const Navbar = () => {
  const [state, setState] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { checked, setChecked } = useChecked();
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state) {
      navigate(`search/${state}`);
      setShowSearch(false); // Hide search input after search
      setChecked(false);
    }
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        position: 'sticky',
        top: '0',
        zIndex: '1',
        backgroundColor: 'black',
        mb: 2,
      }}
    >
      {/* Small screen behavior: if search is active, hide logo and switch */}
      {!showSearch && (
        <Link to='/'>
          <Box
            component='img'
            sx={{
              height: isSmallScreen ? '5vh' : '10vh',
              width: isSmallScreen ? '5rem' : '7.5rem',
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
      )}

      {/* Conditional Search Bar */}
      <Paper
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: showSearch || !isSmallScreen ? '50%' : 'auto',
          bgcolor: 'black',
          color: 'white',
          margin: 'auto',
          padding: '2px 8px',
          transition: 'width 0.3s ease-in-out',
        }}
      >
        {/* If search is active on small screen, show input field */}
        {showSearch || !isSmallScreen ? (
          <InputBase
            sx={{ ml: 1, flex: 1, color: 'white' }}
            placeholder='Search'
            inputProps={{ 'aria-label': 'search' }}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        ) : null}

        {/* Show close button when search is active on small screens */}
        {showSearch && isSmallScreen ? (
          <IconButton
            sx={{ p: '10px', color: 'white' }}
            aria-label='close'
            onClick={() => setShowSearch(false)}
          >
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton
            type={showSearch || !isSmallScreen ? 'submit' : 'button'}
            sx={{ p: '10px' }}
            aria-label='search'
            onClick={() => {
              if (!showSearch) setShowSearch(true);
            }}
          >
            <SearchIcon />
          </IconButton>
        )}
      </Paper>

      {/* Toggle Switch on the right */}
      {!showSearch && (
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                size={isSmallScreen ? 'small' : 'medium'}
              />
            }
            label={
              <Box
                sx={{
                  fontSize: isSmallScreen ? '0.75rem' : '1rem',
                  color: 'white',
                }}
              >
                {`${checked ? 'Distraction free' : 'Full YouTube'}`}
              </Box>
            }
          />
        </FormGroup>
      )}
    </Box>
  );
};

export default Navbar;
