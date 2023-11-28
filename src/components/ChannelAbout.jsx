const ChannelAbout = ({
  description,
  customUrl,
  subscriberCount,
  videoCount,
  viewCount,
  publishedAt,
}) => {
  return (
    <div className='channel-about-container'>
      <h3 className='channel-about-about'>About</h3>
      <div className='channel-about-description'>{description}</div>
      <div className='channel-about-details'>
        <p className='channel-about-custom-url'>{`www.youtube.com/${customUrl}`}</p>
        <p className='channel-about-subscriber-count'>{`${subscriberCount} subscribers`}</p>
        <p className='channel-about-video-count'>{`${videoCount} videos`}</p>
        <p className='channel-about-view-count'>{`${viewCount} views`}</p>
        <p className='channel-about-published-at'>{`Joined ${publishedAt}`}</p>
      </div>
    </div>
  );
};

export default ChannelAbout;
