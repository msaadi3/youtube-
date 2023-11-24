import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import VideoCard from './VideoCard';

const Feed = () => {
  const [data, setData] = useState({});
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
      setData(response.data);
      // return response.data;
    } catch (error) {
      console.error('error while hitting the api: ', error);
      // return null;
    }
  };

  useEffect(() => {
    hitTheApi();
  }, [query]);

  console.log(data);
  // console.log(data.items);
  return (
    <div className='feed-container'>
      {data?.items?.map((item) => {
        return (
          <VideoCard
            key={item.id.videoId}
            thumbnail={item.snippet.thumbnails.default.url}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
          />
        );
      })}
    </div>
  );
};

export default Feed;
