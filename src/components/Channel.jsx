import React, { useState, useEffect } from 'react';
import { fetchDataFromAPI } from '../utils/fetchDataFromAPI.js';
import { ChannelVideos } from './index.js';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Divider, Stack, Typography, Avatar } from '@mui/material';

const Channel = () => {
  const [channelDetails, setChannelDetails] = useState();

  const navigate = useNavigate();
  const { channelId } = useParams();

  if (!channelId) {
    navigate('/');
  }

  const getChannelDetails = async (channelId) => {
    const url = `channels?part=snippet,statistics&id=${channelId}`;
    const response = await fetchDataFromAPI(url);
    setChannelDetails(response.data.items[0]);
    console.log('channelDetails', response.data.items[0]);
  };

  useEffect(() => {
    getChannelDetails(channelId);
  }, []);

  return (
    <>
      <Box
        component='img'
        sx={{
          height: '200px',
          width: '100%',
          objectFit: 'cover',
        }}
        src={channelDetails?.brandingSettings?.image?.bannerExternalUrl}
        alt='banner'
      />
      <Stack
        direction='row'
        spacing={2}
        sx={{ display: 'flex', alignItems: 'center', mb: 3 }}
      >
        <Avatar
          alt='logo'
          src={channelDetails?.snippet?.thumbnails?.high?.url}
          sx={{ width: 80, height: 80 }}
        />

        <Typography variant='h5' component='h5' gutterBottom>
          {channelDetails?.snippet?.title}
        </Typography>
      </Stack>
      <Divider />
      <ChannelVideos channelId={channelId} />
    </>
  );
};

export default Channel;
