import React, { useState } from 'react';
import './App.css';

function GalleryImg(props) {
  return (
    <img src={props.src} alt={props.alt} />
  );
}

function Gallery() {
  const [images, setImage] = useState([
    {
      url: "https://images.unsplash.com/photo-1579614456650-dfcdfee5db11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      alt: "Weird shapes, but cool"
    },
    {
      url: "https://images.unsplash.com/photo-1579681638740-8cbde33e30c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      alt: "Drone shot!"
    },
    {
      url: "https://images.unsplash.com/photo-1579677083279-e146fc4a2c5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=363&q=80",
      alt: "Mountain road, take me home, to the place, na na na na"
    }
  ]);

  return (
    images.map((image, index) => (
      <GalleryImg key={index} src={image.url} alt={image.alt} />
    ))
  );
}

function App() {

  return (
    <div className="App">
      <Gallery />
    </div>
  );
}

export default App;
