import { fetchDataFromAPI } from '../utils/fetchDataFromAPI.js';
import { ChannelVideos, ChannelAbout } from './index.js';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Channel = () => {
  const [channelDetails, setChannelDetails] = useState([]);

  const navigate = useNavigate();
  const { channelId } = useParams();

  if (!channelId) {
    navigate('/');
  }

  const getChannelDetails = async (channelId) => {
    const url = `channels?part=snippet,statistics&id=${channelId}`;
    const response = await fetchDataFromAPI(url);
    setChannelDetails(response.items);
  };

  useEffect(() => {
    getChannelDetails(channelId);
  }, []);

  return (
    <div className='channel-container'>
      <img
        className='channel-banner'
        src={channelDetails[0].brandingSettings.image.bannerExternalUrl}
        alt='banner'
      />
      <img
        className='channel-logo'
        src={channelDetails[0].snippet.thumbnails.high}
        alt='logo'
      />
      <p className='channel-title'>{channelDetails[0].snippet.title}</p>
      <ul className='channel-navigation'>
        <li className='channel-navigation-videos'>
          <NavLink to={`/${channelDetails[0].snippet.customUrl}/videos`}>
            Videos
          </NavLink>
        </li>
        <li className='channel-navigation-about'>
          <NavLink to={`/${channelDetails[0].snippet.customUrl}/about`}>
            About
          </NavLink>
        </li>
      </ul>
      <Route
        path={`/${channelDetails[0].snippet.customUrl}/videos`}
        element={<ChannelVideos channelId={channelId} />}
      />

      {/* Route to About component */}
      <Route
        path={`/${channelDetails[0].snippet.customUrl}/about`}
        element={
          <ChannelAbout
            description={channelDetails[0].snippet.description}
            customUrl={channelDetails[0].snippet.customUrl}
            subscriberCount={channelDetails[0].statistics.subscriberCount}
            videoCount={channelDetails[0].statistics.videoCount}
            viewCount={channelDetails[0].statistics.viewCount}
            publishedAt={channelDetails[0].snippet.publishedAt}
          />
        }
      />
    </div>
  );
};

export default Channel;
