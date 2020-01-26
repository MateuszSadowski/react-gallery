export function setVideos(videos) {
    return {
        type: 'SET_VIDEOS',
        payload: videos
    };
}

export default function rootReducer(state, action) {
    switch(action.type) {
        case 'SET_VIDEOS':
            return {
                ...state,
                videos: action.payload
            };
        default:
            return state;
    };
}