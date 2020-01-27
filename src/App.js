import React, { useRef, useEffect, useContext } from 'react';
import Vimeo from '@vimeo/player'
import './App.css';
import AppProvider, { AppContext } from "./Provider"
import { useVideos } from './hooks/useVideos';
import { setCurrentVideo, setShowVideoplayer } from './Reducer';
import { VIDEOPLAYER_WIDTH, VIMEO_THUMBNAIL_SIZE, VIDEOPLAYER_VOLUME, PARALAX_FACTOR } from './Settings';
import { useMousePosition } from './hooks/useMousePosition';

function GalleryImg(props) {
  const [state, dispatch] = useContext(AppContext);
  const ref = useRef();

  const splitUri = props.uri.split("/");
  const videoId = splitUri.pop();

  let style = {};

  if(ref.current) {
    let translationX = ref.current.offsetLeft - state.mousePos.x;
    let translationY = ref.current.offsetTop - state.mousePos.y;
    style = {
      transform: `translate(${ PARALAX_FACTOR * translationX }px, ${ PARALAX_FACTOR * translationY }px)`
    }
  }

  function onClickImg() {
    if (state.currentVideoId !== videoId) {
      dispatch(setCurrentVideo(videoId));
    }
    dispatch(setShowVideoplayer(true));
  };

  return (
    <img ref={ref} style={style} onClick={onClickImg} className="GalleryImg" src={props.src} alt={props.alt} />
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
  const mousePos = useMousePosition();

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
