import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import VideoCard from './VideoCard';

const Feed = () => {
  const query = useSelector((state) => state.query);
  console.log(query);
  const hitTheApi = async () => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: query,
        part: 'snippet,id',
        regionCode: 'US',
        maxResults: '50',
        order: 'date',
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('error while hitting the api: ', error);
      return null;
    }
  };

  const call = async () => {
    const result = await hitTheApi();
    return result;
  };

  let data = {};

  useEffect(() => {
    data = call();
  }, [query]);

  return (
    <div className='feed-container'>
      {data?.items?.map((item) => {
        return (
          <div id={item.id.videoId} className='video'>
            <VideoCard
              thumbnail={item.snippet.thumbnails.default.url}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
