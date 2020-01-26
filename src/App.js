import React, { useState, useRef, useEffect, useContext } from 'react';
import Vimeo from '@vimeo/player'
import './App.css';
import AppProvider, { AppContext } from "./Provider"
import { useVideos } from './hooks/useVideos';
import { VIDEOPLAYER_WIDTH } from './Settings';
import { setCurrentVideo, setShowVideoplayer } from './Reducer';

function GalleryImg(props) {
  const [state, dispatch] = useContext(AppContext);
  const splitUri = props.uri.split("/");
  const videoId = splitUri.pop();

  function onClickImg() {
    dispatch(setCurrentVideo(videoId));
    dispatch(setShowVideoplayer(true));
  };

  return (
    <img onClick={onClickImg} className="GalleryImg" src={props.src} alt={props.alt} />
  );
}

function VideoPlayer() {
  const [state, dispatch] = useContext(AppContext);

  const options = {
    id: state.currentVideoId,
    width: VIDEOPLAYER_WIDTH
  }

  const ref = useRef(null);

  useEffect(() => {
    if (state.showVideoplayer) {
      let videoPlayer = new Vimeo(ref.current, options);
      videoPlayer.setVolume(0);
    }
  }, [options, state.showVideoplayer])

  return <div>
    {state.showVideoplayer && <div className="Overlay">
      <div className="VideoPlayer" ref={ref}></div>
    </div>}
  </div>
}

function Gallery() {
  const videos = useVideos();
  return (
    <div className="Gallery" >
      {videos && videos.map((video, index) => (
        <GalleryImg key={index} uri={video.uri} src={video.pictures.sizes[4].link} alt={video.name} />
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
