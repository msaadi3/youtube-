import React, { useState, useEffect } from 'react';
import { Box, Stack, Divider, Grid, Avatar, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { fetchDataFromAPI } from '../utils/fetchDataFromAPI';
import Spinner from '../utils/Spinner';
import { VideoCard } from './index';
import calculateTimeDifference from '../utils/calculateTime.js';

const YouTubeVideoPlayer = ({ channelLogo, subscribers }) => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState({
    items: [],
    nextPageToken: '',
    totalResults: 0,
  });
  const [lowerLoading, setLowerLoading] = useState(false);
  const [upperLoading, setUpperLoading] = useState(false);
  const [countResults, setCountResults] = useState(0);

  const { videoId } = useParams();
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  //  fetch suggested videos
  const getSuggestedVideos = async () => {
    if (
      suggestedVideos.totalResults != 0 &&
      countResults >= suggestedVideos.totalResults
    ) {
      return;
    }

    setCountResults((prev) => prev + 25);

    const url = `search?part=id,snippet&maxResults=25&relatedToVideoId=${videoId}&type=video&nextPageToken=${suggestedVideos.nextPageToken}`;
    const response = await fetchDataFromAPI(url);
    console.log('getSuggestedVideos:', response);
    setSuggestedVideos((prevData) => ({
      items: [...prevData.items, ...response?.data?.items],
      totalResults: response?.data?.pageInfo?.totalResults,
      nextPageToken: response?.data?.nextPageToken,
    }));
  };

  // get video details
  const getVideoDetails = async () => {
    const url = `videos?part=contentDetails,snippet,statistics&id=${videoId}`;
    const response = await fetchDataFromAPI(url);
    console.log('getVideoDetails:', response);
    setVideoDetails(response.data.items[0]);
  };

  useEffect(() => {
    setUpperLoading(true);
    getSuggestedVideos();
    getVideoDetails();
    setUpperLoading(false);
  }, [videoId]);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLowerLoading(true);
      getSuggestedVideos();
      setLowerLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  const getPublishedDateForDescription =
    videoDetails?.snippet?.publishedAt.split('T')[0];
  return (
    <>
      <Grid
        container
        sx={{
          width: '100%',
          height: '100vh',
        }}
      >
        {/* video player */}
        <Grid
          item
          sx={{
            ml: 3,
            border: '1px solid #0f172a',
            width: '60%',
            height: '60vh',
          }}
        >
          <ReactPlayer url={url} controls={true} width='100%' height='100%' />
        </Grid>

        {/* suggested videos */}
        <Grid item ml={11}>
          {upperLoading ? (
            <Spinner />
          ) : (
            <>
              {suggestedVideos.items.map((item, index) => {
                const publishedAt = item?.snippet?.publishedAt;
                const getPublishedDate = publishedAt?.split('T')[0];
                const howLongAgo = getPublishedDate
                  ? calculateTimeDifference(getPublishedDate)
                  : null;
                return (
                  <VideoCard
                    key={index}
                    thumbnail={item?.snippet?.thumbnails?.high?.url}
                    title={item?.snippet?.title}
                    channel={item?.snippet?.channelTitle}
                    ago={howLongAgo}
                    channelId={item?.snippet?.channelId}
                    videoId={item?.id?.videoId}
                  />
                );
              })}
              {lowerLoading && <Spinner />}
            </>
          )}
        </Grid>
      </Grid>

      {/* ---------------- */}

      {/* video details */}
      <Box>
        <Stack
          sx={{
            ml: 3,
            width: '60%',
          }}
        >
          <Stack sx={{ /* mt: { md: -25, lg: -35 }*/ mt: -25 }}>
            <Typography variant='h5' component='h5' gutterBottom>
              {videoDetails?.snippet?.title}
            </Typography>
          </Stack>

          <Avatar
            sx={{ width: 80, height: 80 }}
            src={channelLogo}
            // src={videoDetails?.snippet?.thumbnails?.high?.url}
          />
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
            }}
          >
            <Typography variant='h6' component='h6' gutterBottom>
              {videoDetails?.snippet?.channelTitle}
            </Typography>
            <Typography>{subscribers}</Typography>
          </Stack>
        </Stack>

        {/* description */}
        <Stack
          sx={{
            ml: 3,
            width: '60%',
            backgroundColor: '#0f172a',
            color: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            border: '1px solid #0f172a',
          }}
        >
          <Typography>{`${videoDetails?.statistics?.viewCount} views`}</Typography>
          <Typography>{getPublishedDateForDescription}</Typography>
          <Typography>{videoDetails?.snippet?.description}</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default YouTubeVideoPlayer;
