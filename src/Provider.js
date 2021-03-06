import React, { useReducer } from 'react';
import rootReducer from './Reducer';

export const AppContext = React.createContext();

const initialState = { videos: [], showVideoplayer: false, currentVideoId: undefined, mousePos: { x: undefined, y: undefined} };

export default function AppProvider(props) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};