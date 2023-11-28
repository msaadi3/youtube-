import ReactPlayer from 'react-player';

const YouTubeVideoPlayer = ({ videoId }) => {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  return (
    <div>
      <ReactPlayer url={url} controls={true} width='100%' height='100%' />
    </div>
  );
};

export default YouTubeVideoPlayer;
