import { useContext, useEffect } from "react";
import Data from "./Data";

function Catcher() {

    const { pos, setPos } = useContext(Data);

    useEffect(() => {
        let now = 0;
        window.addEventListener('keydown', e => {
            switch (e.key) {
                case 'q':
                    now = 1
                    break;
                case 'w':
                    now = 2
                    break;
                case 'a':
                    now = 3
                    break;
                case 's':
                    now = 4
                    break;
                default:
                    return;
            }
            setPos(now);
        });
    })

    return (
        <div className="catch">
            <div className="bin top left" style={{ visibility: pos === 1 ? 'visible' : 'hidden' }}></div>
            <div className="bin top right" style={{ visibility: pos === 2 ? 'visible' : 'hidden' }}></div>
            <div className="bin bottom left" style={{ visibility: pos === 3 ? 'visible' : 'hidden' }}></div>
            <div className="bin bottom right" style={{ visibility: pos === 4 ? 'visible' : 'hidden' }}></div>
        </div>
    );

}

export default Catcher;