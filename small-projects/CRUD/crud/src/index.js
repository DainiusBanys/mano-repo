import React, { useState } from 'react';
import cx from 'classnames';
import { Component } from 'react';

function Counter() {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <h2>{counter}</h2>
            <button onClick={() => setCounter(counter + 1)}>
                Click
            </button>
        </div>
    );
}

export default class Counter extends Component {
    render(); {
        return (
            <>
                <div>
                    <h2>Counter {Counter} </h2>
                </div>
                <style>{`
                    .counter-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                `}</style>
            </>
        );
    }

