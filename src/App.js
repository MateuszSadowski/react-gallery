import React, { useRef, useEffect, useContext } from 'react';
import Vimeo from '@vimeo/player'
import './App.css';
import AppProvider, { AppContext } from "./Provider"
import { useVideos } from './hooks/useVideos';
import { setCurrentVideo, setShowVideoplayer } from './Reducer';
import { VIDEOPLAYER_WIDTH, VIMEO_THUMBNAIL_SIZE, VIDEOPLAYER_VOLUME } from './Settings';

function GalleryImg(props) {
  const [state, dispatch] = useContext(AppContext);
  const splitUri = props.uri.split("/");
  const videoId = splitUri.pop();

  function onClickImg() {
    if (state.currentVideoId !== videoId) {
      dispatch(setCurrentVideo(videoId));
    }
    dispatch(setShowVideoplayer(true));
  };

  return (
    <img onClick={onClickImg} className="GalleryImg" src={props.src} alt={props.alt} />
  );
}

function VideoPlayer() {
  const [state, dispatch] = useContext(AppContext);
  const ref = useRef(null);

  useEffect(() => {
    if (state.showVideoplayer) {
      let videoPlayer = new Vimeo(ref.current, {
        id: state.currentVideoId,
        width: VIDEOPLAYER_WIDTH
      });
      videoPlayer.setVolume(VIDEOPLAYER_VOLUME);
    }
  }, [state.currentVideoId, state.showVideoplayer])

  function onOverlayClick() {
    dispatch(setShowVideoplayer(false));
  }

  return <div>
    {state.showVideoplayer && <div onClick={onOverlayClick} className="Overlay">
      <div className="VideoPlayer" ref={ref}></div>
    </div>}
  </div>
}

function Gallery() {
  const videos = useVideos();

  return (
    <div className="Gallery" >
      {videos && videos.map((video, index) => (
        <GalleryImg key={index} uri={video.uri} src={video.pictures.sizes[VIMEO_THUMBNAIL_SIZE].link} alt={video.name} />
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
