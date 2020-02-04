import { useEffect, useContext } from 'react';
import { fetchVideos } from '../Api';
import { AppContext } from '../Provider';
import { setVideos } from '../Reducer';

export function useVideos() {
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        async function init() {
            const videos = await fetchVideos();
            if (videos) {
                dispatch(setVideos(videos.data));
            } else {
                console.error('Could not fetch videos. Check your internet connection.');
            }
        }
        init();
    }, [dispatch]);

    return state.videos;
}