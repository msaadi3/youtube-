import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MultiActionAreaCard({
  thumbnail,
  title,
  channel,
  ago,
  videoId,
  channelId,
}) {
  return (
    <Card sx={{ maxWidth: 345, bgcolor: 'black' }}>
      <CardActionArea>
        <Link to={`/watch/${videoId}`}>
          <CardMedia
            component='img'
            height='default'
            image={thumbnail}
            alt='thumbnail'
          />
        </Link>
        <CardContent>
          <Link to={`/watch/${videoId}`}>
            <Typography variant='body2' sx={{ color: 'white' }}>
              {title}
            </Typography>
          </Link>
          {channelId && (
            <Link to={`/channel/${channelId}/videos`}>
              <Typography gutterBottom component='div' sx={{ mt: 1 }}>
                {channel}
              </Typography>
            </Link>
          )}
          {ago && (
            <Typography gutterBottom component='div' sx={{ mt: 1 }}>
              {ago}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
