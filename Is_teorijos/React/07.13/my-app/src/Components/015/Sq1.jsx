import { useEffect } from "react";
import { useState } from "react";
import rand from '../../Functions/rand';

function Sq1({setCounter}) {

    const [sq, setSq] = useState([]);

    useEffect(() => {
        setCounter(s => [
            sq.filter(s => s.type === 0).length,
            sq.filter(s => s.type === 1).length
        ]);
    }, [sq, setCounter]);

    const add = () => {
        setSq(s => [...s, 
            {color: 'pink', type: rand(0, 1), size: rand(25, 125), row: s.length, show: true},
            {color: 'skyblue', type: rand(0, 1), size: rand(25, 125), row: s.length + 1, show: true}
        ]);
    }

    const sort = () => {
        setSq(s => [...s].sort((a, b) => b.size - a.size));
    }

    const sortBack = () => {
        setSq(s => [...s].sort((a, b) => a.row - b.row));
    }

    const filterSq = () => {
        setSq(s => s.map(f => ({...f, show: f.type ? false : true})))
    }

    const filterCi = () => {
        setSq(s => s.map(f => ({...f, show: f.type ? true : false})))
    }

    const filterAll = () => {
        setSq(s => s.map(f => ({...f, show: true})))
    }

    const sortFancy = () => {
        setSq(s => [...s].sort((a, b) => {
            if (a.type === 1 && b.type === 0) {
                return 1;
            }
            if (a.type === 0 && b.type ===1) {
                return -1;
            }
            return b.size - a.size;
        }))
    }

    return (
        <>
        <div className="container">
            {
                sq.map((s, i) => s.show ? <div className="sc" style={{
                    backgroundColor:s.color,
                    borderRadius: s.type ? '50%' : null,
                    width: s.size + 'px',
                    height: s.size + 'px'
                }} key={i}></div> : null)
            }
        </div>
        <div className="container">
            <button onClick={add}>add</button>
            <button onClick={sort}>sort</button>
            <button onClick={sortBack}>sort back</button>
            <button onClick={sortFancy}>fancy sort</button>
            <button className="red" onClick={filterSq}>show []</button>
            <button className="red" onClick={filterCi}>show O</button>
            <button className="red" onClick={filterAll}>show all</button>
        </div>
        </>
    )
}

export default Sq1