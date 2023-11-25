import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoCard from './VideoCard';
import YouTubeVideoPlayer from './YouTubeVideoPlayer.jsx';
import Spinner from '../utils/Spinner.jsx';
import calculateTimeDifference from '../utils/calculateTime.js';
import { hitApi } from '../utils/fetchDataFromAPI.js';

const Feed = () => {
  const [data, setData] = useState({ items: [], nextPageToken: '' });
  const [upperLoading, setUpperLoading] = useState(false);
  const [lowerLoading, setLowerLoading] = useState(false);
  const [selectYouTubeVideoId, setSelectYouTubeVideoId] = useState(null);

  const query = useSelector((state) => state.query);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUpperLoading(true);
        const url = `search?q=${query}&part=snippet,id&regionCode=PK&nextPageToken=${data.nextPageToken}`;
        const response = await hitApi(url);
        setData(() => ({
          items: response?.data?.items,
          nextPageToken: response?.data?.nextPageToken,
        }));
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setUpperLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      try {
        setLowerLoading(true);
        const url = `search?q=${query}&part=snippet,id&regionCode=PK&nextPageToken=${data.nextPageToken}`;
        const response = await hitApi(url);
        setData((prevData) => ({
          items: [...prevData.items, ...response?.data?.items],
          nextPageToken: response?.data?.nextPageToken,
        }));
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLowerLoading(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  const handleVideoClick = (videoId) => {
    setSelectYouTubeVideoId(videoId);
  };
  let id = 0;
  return (
    <div className='feed-container'>
      {upperLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.items?.map((item) => {
            const publishedAt = item.snippet.publishedAt;
            const getPublishedDate = publishedAt.split('T')[0];
            const howLongAgo = calculateTimeDifference(getPublishedDate);
            return (
              <VideoCard
                key={++id}
                thumbnail={item.snippet.thumbnails.high.url}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                ago={howLongAgo}
                handleVideoClick={() => handleVideoClick(item.id.videoId)}
              />
            );
          })}
          {selectYouTubeVideoId && (
            <YouTubeVideoPlayer videoId={selectYouTubeVideoId} />
          )}
          {lowerLoading && <Spinner />}
        </>
      )}
    </div>
  );
};

export default Feed;
