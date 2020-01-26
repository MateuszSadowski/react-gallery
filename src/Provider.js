import React, { useState, useEffect } from 'react';
import * as Secret from "./Secret";

export const VideosContext = React.createContext();

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

export default function Provider(props) {
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