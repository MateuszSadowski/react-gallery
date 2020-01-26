import React, { useEffect, useReducer } from 'react';
import rootReducer, { setVideos } from './Reducer';
import * as Secret from "./Secret";

export const VideosContext = React.createContext();

async function fetchVideos() {
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

export default function Provider(props) {
    const [state, dispatch] = useReducer(rootReducer, {});

    useEffect(() => {
        async function init() {
          const videos = await fetchVideos();
          dispatch(setVideos(videos));
        }
        init();
    }, []);

    return (
        <VideosContext.Provider value={[state, dispatch]}>
            {props.children}
        </VideosContext.Provider>
    );
};