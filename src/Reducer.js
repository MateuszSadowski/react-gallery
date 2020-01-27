export default function rootReducer(state, action) {
    switch (action.type) {
        case 'SET_VIDEOS':
            return {
                ...state,
                videos: action.payload
            };
        case 'SET_CURRENT_VIDEO':
            return {
                ...state,
                currentVideoId: action.payload
            };
        case 'SET_SHOW_VIDEOPLAYER':
            return {
                ...state,
                showVideoplayer: action.payload
            }
        default:
            return state;
    };
}

export function setVideos(videos) {
    return {
        type: 'SET_VIDEOS',
        payload: videos
    };
}

export function setCurrentVideo(videoId) {
    return {
        type: 'SET_CURRENT_VIDEO',
        payload: videoId
    }
}

export function setShowVideoplayer(show) {
    return {
        type: 'SET_SHOW_VIDEOPLAYER',
        payload: show
    }
}
