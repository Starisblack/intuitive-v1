import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import {Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoPlayer from '../VideoPlayer';
import { CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import "./PostCard.css"

type PostCardProps ={
   title: string;
   content: string,
   imgURL?: string,
   videoURL?: string,
   link: string
}

const PostCard: React.FC<PostCardProps> =  ({title, content, imgURL, videoURL, link}) => {


 

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <AccountCircleIcon />
          </Avatar>
        }
    
        title={"Sam" + " " + "Ogunniyi"}
        subheader="September 14, 2016"
      />

      {videoURL && <VideoPlayer link={videoURL} height="200px" />}


      {imgURL && <CardMedia
        component="img"
        height="194"
        image={imgURL}
        alt="Paella dish"
      />}
      <CardContent>
      <Typography style={{fontSize: "1.1rem", marginBottom: "15px"}} variant="h5" color="dark">
          {title.substring(0, 25)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content.substring(0, 158) + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={link}>
        <Button className="read-btn" >Read More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default PostCard;