const VideoCard = ({ thumbnail, title, channel, ago, handleVideoClick }) => {
  return (
    <div className='video-card-container'>
      <img
        className='thumbnail'
        src={thumbnail}
        alt='thumbnail'
        onClick={handleVideoClick}
      />
      <div className='video-card-details'>
        <p className='title' onClick={handleVideoClick}>
          {title}
        </p>
        <p className='ago'> {ago}</p>
        <p className='channel'>{channel}</p>
      </div>
    </div>
  );
};

export default VideoCard;
