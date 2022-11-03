import { useState, useContext, useEffect, useRef } from 'react';
import Data from './Data';
import rand from '../Functions/rand';
import { useCallback } from 'react';


function EggsHolder({ side, number, roll }) {

    const [eggs, setEggs] = useState([...Array(12)].map(() => false));
    const { play, setReadyEggs, setResult, pos } = useContext(Data);
    const timer = useRef(null);
    const dropEgg = useRef(false);

    const runRow = useCallback(() => {
        timer.current = setInterval(() => {
            setEggs(e => {
                const eggs = [...e];
                dropEgg.current = eggs.pop()
                eggs.unshift(!rand(0, 6));
                return eggs;
            });
        }, 1000)
    }, []);

    useEffect(() => {
        return () => {
            if (null !== timer.current) {
                clearInterval(timer.current)
                timer.current = null;
            }
        }
    }, []);

    useEffect(() => {
        if (false === play) {
            if (null !== timer.current) {
                clearInterval(timer.current)
                timer.current = null;
            }
        } else if (null === timer.current) {
            runRow();
        }
    }, [play, runRow]);

    useEffect(() => {
        if (dropEgg.current) {
            setResult(r => ({ ...r, missed: r.missed + 1 }));
            dropEgg.current = false;
        }

        const lastEgg = eggs[eggs.length - 1];
        if (lastEgg) {
            if (pos === number) {
                setResult(r => ({ ...r, catched: r.catched + 1 }));
                setEggs(e => {
                    const eggs = [...e];
                    eggs[eggs.length - 1] = false;
                    return eggs;
                })
            }
        }
    }, [eggs, setReadyEggs, setResult, number, pos]);

    return (
        <div className={'eggs-bin ' + side}>
            <div className={'path ' + side}>
                {
                    eggs.map((e, i) => e ?
                        <div className="egg" style={{transform: 'rotate('+ (i * 50 * roll) +'deg)'}} key={i}></div> :
                        <div className="no-egg" key={i}></div>)
                }
            </div>
        </div>
    )
}

export default EggsHolder;