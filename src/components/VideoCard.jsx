const VideoCard = ({ thumbnail, title, channel, ago }) => {
  return (
    <div className='video-card-container'>
      <img className='thumbnail' src={thumbnail} alt='thumbnail' />
      <div className='video-card-details'>
        <p className='title'>{title}</p>
        {ago && <p className='ago'> {ago}</p>}
        {channel && <p className='channel'>{channel}</p>}
      </div>
    </div>
  );
};

export default VideoCard;
