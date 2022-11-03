import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

function Inputs({ setSq, sqId, sq }) {

    const [text, setText] = useState('');
    const [color, setColor] = useState('coral');
    const [disabled, setDisabled] = useState(true);
    const [type, setType] = useState(0);
    const textInput = useRef();
    const [size, setSize] = useState(0);
    const [select, setSelect] = useState(0);

    useEffect(() => {
        setDisabled(text.length < 3);
    }, [text]);

    useEffect(() => {
        textInput.current.focus();
    }, []);

    useEffect(() => {
        if (0 === parseInt(size)) {
            return;
        }
        setSq(sq => sq.map(s => s.id !== parseInt(select) ? {...s} : {...s, size: parseInt(size)}))
    }, [size, select, setSq]);


    useEffect(() => {
        if (0 === parseInt(select)) {
            return;
        }
        setSize(sq.find(s => s.id === parseInt(select))?.size ?? 0);
    }, [select, sq]);


    const addText = e => {
        setText(e.target.value);
    }

    const add = () => {
        setSq(s => [...s, { text, color, type, id: sqId.current++, show: true, size: 200 }]);
        setText('');
    }

    const sort = () => {
        setSq(s => [...s].sort((a, b) => a.text.localeCompare(b.text)));
    }

    const sortBack = () => {
        setSq(s => [...s].sort((a, b) => a.id - b.id));
    }

    const showGreen = () => {
        setSq(s => s.map(sq => ({ ...sq, show: sq.color === 'greenyellow' ? true : false })))
    }

    const showAll = () => {
        setSq(s => s.map(sq => ({ ...sq, show: true })))
    }

    const doType = () => {
        setType(t => t === 3 ? 0 : t + 1);
    }

    return (
        <div className="inputs-bin">
            <div className="bin">
                <input id="coral" type="checkbox" checked={color === 'coral'} value="coral" onChange={e => setColor(e.target.value)}></input>
                <label className="color" htmlFor="coral" style={{ backgroundColor: 'coral' }}></label>
                <input id="greenyellow" type="checkbox" checked={color === 'greenyellow'} value="greenyellow" onChange={e => setColor(e.target.value)}></input>
                <label className="color" htmlFor="greenyellow" style={{ backgroundColor: 'greenyellow' }}></label>
                <input id="plum" type="checkbox" checked={color === 'plum'} value="plum" onChange={e => setColor(e.target.value)}></input>
                <label className="color" htmlFor="plum" style={{ backgroundColor: 'plum' }}></label>
                <span>Color</span>
            </div>

            <div className="bin">
                <input type="checkbox" id="type" readOnly checked={type > 1} />
                <input type="checkbox" id="type" readOnly checked={!(type % 2)} />
                <label className="type" onClick={doType}></label>
                <span>Type</span>
            </div>
            <div className="bin">
                <input type="text" onChange={addText} value={text} ref={textInput} />
                <span>Text</span>
            </div>
            <div className="bin">
            <button className="green" onClick={add} disabled={disabled}>Add []</button>
            <span>Add New</span>
            </div>
            <div className="bin">
                <button className="blue" onClick={sort}>Sort</button>
                <button className="blue" onClick={sortBack}>Sort Back</button>
                <span>Sort</span>
            </div>
            <div className="bin">
                <button className="blue" onClick={showGreen}>Show Green</button>
                <button className="blue" onClick={showAll}>Show All</button>
                <span>Filter</span>
            </div>
            <div className="bin">
                <select value={select} onChange={e => setSelect(e.target.value)}>
                    <option value="0">Select Square</option>
                    {
                        sq.map(s => <option value={s.id} key={s.id}>ID: {s.id} {s.text}</option>)
                    }
                </select>
                <input type="range" onChange={e => setSize(e.target.value)} value={size} min="100" max="300" step="10" />
                <span>List</span>
            </div>
        </div>
    )
}

export default Inputs; 