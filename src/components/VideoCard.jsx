const VideoCard = ({
  thumbnail,
  title,
  channel /** , channelImg, views, ago*/,
}) => {
  return (
    <div className='video-card-container'>
      <img className='thumbnail' src={thumbnail} alt='thumbnail' />
      <div className='video-card-details'>
        {/* <img className='channel-logo' src={channelImg} alt='channelImg' /> */}
        <p className='title'>{title}</p>
        <p className='channel'>{channel}</p>
        {/* <div className='views-ago-container'>
          <p className='views'>{views}</p>
          <p className='ago'>{ago}</p>
        </div> */}
      </div>
    </div>
  );
};

export default VideoCard;
