import { useEffect, useContext } from 'react';
import { AppContext } from '../Provider';
import { setMousePosition } from '../Reducer';


export function useMousePosition() {
    const [state, dispatch] = useContext(AppContext);

    function handleMouseMove(e) {
        dispatch(setMousePosition({
            x: e.pageX,
            y: e.pageY
        }))
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return function cleanUp() {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return state.mousePos;
}