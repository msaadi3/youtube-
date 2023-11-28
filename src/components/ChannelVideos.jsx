import { fetchDataFromAPI } from '../utils/fetchDataFromAPI';
import Spinner from '../utils/Spinner.jsx';
import { VideoCard } from './index.js';

const ChannelVideos = ({ channelId }) => {
  // states
  const [channelVideos, setChannelVideos] = React.useState({
    items: [],
    nextPageToken: '',
    totalResults: 0,
  });
  const [upperLoading, setUpperLoading] = useState(false);
  const [lowerLoading, setLowerLoading] = useState(false);

  // getChannelVideos | function to fetchDataFromAPI
  let countNumberOfResults = 0;
  const getChannelVideos = async (channelId) => {
    if (countNumberOfResults >= channelVideos.totalResults) return;

    countNumberOfResults += 50;
    const url = `search?part=snippet,id&maxResults=50&channelId=${channelId}`;
    const response = await fetchDataFromAPI(url);
    setChannelVideos(() => ({
      items: response?.data?.items,
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
    <>
      {upperLoading ? (
        <Spinner />
      ) : (
        channelVideos.items.map((video, index) => (
          <VideoCard
            key={index}
            thumbnail={video.snippet.thumbnails.high}
            title={video.snippet.title}
          />
        ))
      )}
      {lowerLoading && <Spinner />}
    </>
  );
};

export default ChannelVideos;
