import { useEffect, useContext } from 'react';
import { fetchVideos } from '../Api';
import { AppContext } from '../Provider';
import { setVideos } from '../Reducer';

export function useVideos() {
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        async function init() {
            const videos = await fetchVideos();
            dispatch(setVideos(videos.data));
        }
        init();
    }, [dispatch]);

    return state.videos;
}