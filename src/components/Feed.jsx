import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { VideoCard } from './index.js';
import Spinner from '../utils/Spinner.jsx';
import calculateTimeDifference from '../utils/calculateTime.js';
import { fetchDataFromAPI } from '../utils/fetchDataFromAPI.js';

const Feed = () => {
  const [data, setData] = useState({ items: [], nextPageToken: '' });
  const [upperLoading, setUpperLoading] = useState(false);
  const [lowerLoading, setLowerLoading] = useState(false);

  const query = useSelector((state) => state.query);

  useEffect(() => {
    const fetchData = async () => {
      setUpperLoading(true);
      const url = `search?q=${query}&part=snippet,id&maxResults=50&regionCode=PK&nextPageToken=${data.nextPageToken}`;
      const response = await fetchDataFromAPI(url);
      setData(() => ({
        items: response?.data?.items,
        nextPageToken: response?.data?.nextPageToken,
      }));
      setUpperLoading(false);
    };

    fetchData();
  }, [query]);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLowerLoading(true);
      const url = `search?q=${query}&part=snippet,id&regionCode=PK&nextPageToken=${data.nextPageToken}`;
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
    <div className='feed-container'>
      {upperLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.items?.map((item, index) => {
            const publishedAt = item.snippet.publishedAt;
            const getPublishedDate = publishedAt.split('T')[0];
            const howLongAgo = calculateTimeDifference(getPublishedDate);
            return (
              <VideoCard
                key={index}
                thumbnail={item.snippet.thumbnails.high.url}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                ago={howLongAgo}
              />
            );
          })}
          {lowerLoading && <Spinner />}
        </>
      )}
    </div>
  );
};

export default Feed;
