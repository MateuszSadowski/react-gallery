import React, { useState, useRef, useEffect } from 'react';
import Vimeo from '@vimeo/player'
import './App.css';
import AppProvider from "./Provider"
import { useVideos } from './hooks/useVideos';

function GalleryImg(props) {
  return (
    <img className="GalleryImg" src={props.src} alt={props.alt} />
  );
}

function VideoPlayer() {
  const [options, setOptions] = useState({
    id: "259211385",
    width: 640
  })
  const ref = useRef(null);

  useEffect(() => {
    let videoPlayer = new Vimeo(ref.current, options);
    videoPlayer.setVolume(0);
  }, [options])

  return (<div className="Overlay">
    <div className="VideoPlayer" ref={ref}></div>
  </div>);
}

function Gallery() {
  const videos = useVideos();

  return (
    <div className="Gallery" >
      {videos && videos.map((video, index) => (
        <GalleryImg key={index} src={video.pictures.sizes[4].link} alt={video.name} />
      ))}
    </div>
  );
}

function App() {
  return (<div className="App">
    <AppProvider>
      <VideoPlayer />
      <Gallery />
    </AppProvider>
  </div>);
}

export default App;
