import React, { useState, useRef, useEffect, useContext } from 'react';
import Vimeo from '@vimeo/player'
import './App.css';
import * as Secret from "./Secret";

const VideosContext = React.createContext();

async function fetchData() {
  try {
    const result = await fetch(`https://api.vimeo.com/users/${ Secret.VIMEO_USER_ID }/videos`, {
      method: "get",
      headers: new Headers({
        'Authorization': `Bearer ${ Secret.VIMEO_PRIVATE_ACCESS_TOKEN }`
      })
    });
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};

function Provider(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function init() {
      setData(await fetchData());
    }
    init();
  }, []);

  return (
    <VideosContext.Provider value={data}>
      {props.children}
    </VideosContext.Provider>
  );
};

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
  const data = useContext(VideosContext);

  return (
    <div className="Gallery" >
      {data && data.data.map((video, index) => (
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
