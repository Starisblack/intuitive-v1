import React from 'react'
import ReactPlayer from 'react-player'
import thumbnail from "../assets/default.jpg"

const VideoPlayer = (props: {link: string, height: any}) => {
  return <ReactPlayer light={thumbnail}  controls={true} width="100%" height={props.height} url={props.link} />
}

export default VideoPlayer