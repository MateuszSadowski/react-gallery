import React, { useState, useRef, useEffect, useContext } from 'react';
import Vimeo from '@vimeo/player'
import './App.css';
import Provider, { VideosContext } from "./Provider"

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
  const [state] = useContext(VideosContext);
  const videos = state.videos;

  return (
    <div className="Gallery" >
      {videos && videos.data.map((video, index) => (
        <GalleryImg key={index} src={video.pictures.sizes[4].link} alt={video.name} />
      ))}
    </div>
  );
}

function App() {
  return (<div className="App">
    <Provider>
      <VideoPlayer />
      <Gallery />
    </Provider>
  </div>);
}

export default App;
