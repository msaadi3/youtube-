import React, { useEffect, useState } from 'react';
import { VideoCard } from './index.js';
import Spinner from '../utils/Spinner.jsx';
import calculateTimeDifference from '../utils/calculateTime.js';
import { fetchDataFromAPI } from '../utils/fetchDataFromAPI.js';
import { Box, Avatar, Typography, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useChecked } from '../CheckedContext.jsx';

const Feed = () => {
  const [data, setData] = useState({ items: [], nextPageToken: '' });
  const [upperLoading, setUpperLoading] = useState(false);
  const [lowerLoading, setLowerLoading] = useState(false);

  const { searchTerm } = useParams();
  const { checked } = useChecked();

  useEffect(() => {
    const fetchData = async () => {
      setUpperLoading(true);
      const url = `search?q=${searchTerm}&part=snippet,id&maxResults=50&regionCode=PK&nextPageToken=${data.nextPageToken}`;
      const response = await fetchDataFromAPI(url);
      setData(() => ({
        items: response?.data?.items,
        nextPageToken: response?.data?.nextPageToken,
      }));
      setUpperLoading(false);
    };

    if (!checked && searchTerm !== '') {
      fetchData();
    }
  }, [searchTerm, checked]);

  // Clear data when `checked` becomes true
  useEffect(() => {
    if (checked && searchTerm == null) {
      setData({ items: [], nextPageToken: '' }); // Clear the data
    }
  }, [checked]);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLowerLoading(true);
      const url = `search?q=${searchTerm}&part=snippet,id&regionCode=PK&nextPageToken=${data.nextPageToken}`;
      const response = await fetchDataFromAPI(url);
      setData((prevData) => ({
        items: [...prevData.items, ...response?.data?.items],
        nextPageToken: response?.data?.nextPageToken,
      }));
      setLowerLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        ml: '20px',
      }}
    >
      {upperLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.items?.map((item, index) => {
            const publishedAt = item.snippet.publishedAt;
            const getPublishedDate = publishedAt.split('T')[0];
            const howLongAgo = calculateTimeDifference(getPublishedDate);
            return item.id.kind === 'youtube#video' ? (
              <VideoCard
                key={index}
                thumbnail={item.snippet.thumbnails.high.url}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                ago={howLongAgo}
                videoId={item.id.videoId}
                channelId={item.snippet.channelId}
              />
            ) : (
              <Stack key={index} direction={'column'} ml='20px' mt='35px'>
                <Link to={`/channel/${item.snippet.channelId}/videos`}>
                  <Avatar
                    key={index}
                    src={item.snippet.thumbnails.high.url}
                    alt={item.snippet.title}
                    sx={{ width: 200, height: 200, mb: 5 }}
                  />
                  <Typography
                    variant='h5'
                    component='h5'
                    color='white'
                    gutterBottom
                  >
                    {item.snippet.channelTitle}
                  </Typography>
                </Link>
              </Stack>
            );
          })}
          {lowerLoading && <Spinner />}
        </>
      )}
    </Box>
  );
};

export default Feed;
