import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery } from '../features/searchSlice';
import youtubeLogo from '../assets/YouTube.svg';
import searchIcon from '../assets/Search.svg';

const Navbar = () => {
  const [state, setState] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(state));
  };

  return (
    <div className='navbar-container'>
      <img className='youtube-logo' src={youtubeLogo} alt='logo' />
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='input'
          type='text'
          placeholder='Search'
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <img className='svg' src={searchIcon} alt='searchIcon' />
      </form>
    </div>
  );
};

export default Navbar;
