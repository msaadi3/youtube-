import React, { useState, useEffect } from 'react';
import { fetchDataFromAPI } from '../utils/fetchDataFromAPI';
import Spinner from '../utils/Spinner.jsx';
import { VideoCard } from './index.js';
import calculateTimeDifference from '../utils/calculateTime.js';
import { Box } from '@mui/material';

const ChannelVideos = ({ channelId }) => {
  // states
  const [channelVideos, setChannelVideos] = React.useState({
    items: [],
    nextPageToken: '',
    totalResults: 0,
  });
  const [upperLoading, setUpperLoading] = useState(false);
  const [lowerLoading, setLowerLoading] = useState(false);
  const [countNumberOfResults, setCountNumberOfResults] = useState(0);

  // getChannelVideos | function to fetchDataFromAPI

  const getChannelVideos = async (channelId) => {
    if (
      channelVideos.totalResults != 0 &&
      countNumberOfResults >= channelVideos.totalResults
    ) {
      return;
    }

    setCountNumberOfResults((prev) => prev + 50); // 50 is the max number of results per request.
    const url = `search?part=snippet,id&maxResults=50&order=date&channelId=${channelId}`;
    const response = await fetchDataFromAPI(url);
    console.log('channelVideos ', response);
    setChannelVideos((prevData) => ({
      items: [...prevData.items, ...response?.data?.items],
      nextPageToken: response?.data?.nextPageToken,
      totalResults: response?.data?.pageInfo?.totalResults,
    }));
  };

  useEffect(() => {
    setUpperLoading(true);
    getChannelVideos(channelId);
    setUpperLoading(false);
  }, []);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLowerLoading(true);
      getChannelVideos(channelId);
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
          {channelVideos.items.map((video, index) => {
            const publishedAt = video?.snippet?.publishedAt;
            const getPublishedDate = publishedAt?.split('T')[0];
            const howLongAgo = getPublishedDate
              ? calculateTimeDifference(getPublishedDate)
              : null;
            return (
              <VideoCard
                key={index}
                thumbnail={video.snippet.thumbnails.high.url}
                title={video.snippet.title}
                ago={howLongAgo}
                videoId={video.id.videoId}
              />
            );
          })}
          {lowerLoading && <Spinner />}
        </>
      )}
    </Box>
  );
};

export default ChannelVideos;
