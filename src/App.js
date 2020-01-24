import React, { useState, useRef, useEffect } from 'react';
import Vimeo from '@vimeo/player'
import './App.css';
import * as Secret from "./Secret";

function GalleryImg(props) {
  return (
    <img className="GalleryImg" src={props.src} alt={props.alt} />
  );
}

const options = {
  id: "259211385",
  width: 640
};

function Gallery() {
  const ref = useRef(null);

  useEffect(() => {
    let videoPlayer = new Vimeo(ref.current, options);
    videoPlayer.setVolume(0);
  }, [])

  // const [images, setImage] = useState([
  //   {
  //     url: "https://images.unsplash.com/photo-1579614456650-dfcdfee5db11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  //     alt: "Weird shapes, but cool"
  //   },
  //   {
  //     url: "https://images.unsplash.com/photo-1579681638740-8cbde33e30c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
  //     alt: "Drone shot!"
  //   },
  //   {
  //     url: "https://images.unsplash.com/photo-1579677083279-e146fc4a2c5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=363&q=80",
  //     alt: "Mountain road, take me home, to the place, na na na na"
  //   }
  // ]);

  return (<div ref={ref}></div>
    // <div className="Gallery" >
    //   {images.map((image, index) => (
    //     <GalleryImg key={index} src={image.url} alt={image.alt} />
    //   ))}
    // </div>
  );
}

function App() {
  return (<div className="App">
    <Gallery />
  </div>);
}

export default App;
