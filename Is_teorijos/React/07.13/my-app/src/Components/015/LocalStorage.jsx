import { useState } from "react";

function LocalStorage() {

    const [data, setData] = useState('');
    const [data2, setData2] = useState([]);

    const addToStorage = () => {
        localStorage.setItem('myCat','PUKE');
        localStorage.setItem('myArray', JSON.stringify(['Puke', ' ir ', 'Sima']));
    }

    const getFromStorage = () => {
        setData(localStorage.getItem('myCat'));
        setData2(JSON.parse(localStorage.getItem('myArray')));
    }


    const removeFromStorage = () => {
        localStorage.removeItem('myCat');
        localStorage.removeItem('myArray');
    }


    return (
        <>
            <div className="container">
                <h1>{data === null ? 'data not found' : data}</h1>
            </div>
            <div className="container">
                {
                    data2?.map((d, i) => <h2 key={i}>{d}</h2>)
                }
            </div>
            <div className="container">

                <button onClick={addToStorage}>ADD TO STORAGE</button>
                <button onClick={getFromStorage}>GET FROM STORAGE</button>
                <button onClick={removeFromStorage}>REMOVE FROM STORAGE</button>
            </div>
        </>
    )
}

export default LocalStorage;