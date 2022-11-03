import { useState } from 'react';
import rand from '../../Functions/rand';
import randColor from '../../Functions/randomColor';
import Squares3 from './Square.jsx';
import Squares5 from './Square5.jsx';
import SquareRound from './SquareRound';

function NiceAndFun({ spalva }) {

    const [size, setSize] = useState(36); //Hook
    const [bg, setBg] = useState('pink'); //Hook

    const [count, setCount] = useState(0);

    const [squares, setSquare] = useState([]);
    const [squares1, setSquare1] = useState([]);
    const [squares2, setSquare2] = useState([]);
    const [squares3, setSquare3] = useState([]);
    const [squaresRound, setSquareRound] = useState([]);
    const [squares5, setSquare5] = useState([]);



    const doSize = () => {
        setSize(s => s === 56 ? 36 : 56);
    }

    const doBack = () => {
        setBg(s => s === 'pink' ? 'green' : 'pink');
    }

    const doMore = () => {
        setCount(s => s + rand(5, 10));
    }

    const blueButtonClicked = () => {
        setSquare(S => [...S, '']);
        // setSquare({squares: [...squares,'']} )
        console.log(squares)
    
        }
    const grayButtonClicked = () => {
        setSquare1(S => [...S, randColor()]);
        // setSquare({squares: [...squares,'']} )
        console.log(squares1)
            }
    const gray1ButtonClicked = () => {
        setSquare2((S) => [...S, {color:randColor(), digit:rand(10,99)}]);
        // setSquare({squares: [...squares,'']} )
        console.log(squares2)
            }

            const greenButtonClicked = () => {
                // setSquare1(S => S.filter((_,i) => i));
                setSquare1(S => S.slice(1));
                // su slice pabandyti
                console.log(squares1)
            }
            
            const redButtonClicked = () => {
                setSquare(_ => []);
                // setSquare({squares: [...squares,'']} )
                console.log(squares)
                    }

                    const onButtonClicked = () => {
                        setSquare3(S => [...S, '']);
                        // setSquare({squares: [...squares,'']} )
                        console.log(squares3)     
                    }       
                    const squareButtonClicked = () => {
                        setSquare5(S => [...S, '']);
                        // setSquare({squares: [...squares,'']} )
                        console.log(squares5)     
                    }       
                    
                    const squareRoundButtonClicked = () => {
                        setSquareRound(S => [...S, '']);
                        // setSquare({squares: [...squares,'']} )
                        console.log(squares5)  
                    }   
    return (
        <>
            <h2 style={
                {
                        color: spalva,
                        fontSize: size + 'px',
                        backgroundColor: bg
                }
                    }>  Braškė {count}
            </h2>
            <div className="container">
            <button onClick={doSize}>SIZE</button>
            <button onClick={doBack}>BG</button>
            <button onClick={doMore}>MORE</button>
            <button className='blue' onClick={blueButtonClicked}>Squares!</button>
            <button className='gray' onClick={grayButtonClicked}>colorSquares!</button>
            <button className='red' onClick={redButtonClicked}>removeSquares!</button>
            <button className='green' onClick={greenButtonClicked}>remove1Square!</button>
            <button className='gray' onClick={gray1ButtonClicked}>colorSquares!</button>
            <button className='blue' onClick={onButtonClicked}>Squares!</button>
            <button className='blue' onClick={squareRoundButtonClicked}>SquaresRound</button>
            <button className='blue' onClick={squareButtonClicked}>Squares5!</button>

            </div>
           <div className="container"> { squares.map((_, i) => <div className='square'  key={i}>{i+1}</div>) }</div>
           <div className="container"> { squares1.map((c, i) => <div className='square' style={{borderColor: c}} key={i}></div>) }</div>
           <div className="container"> { squares2.map((c, i) => <div className='square' style={{borderColor: c.color}} key={i}>{c.digit}</div>) }</div>
           <div className="container"> { squares3.map((_, i) => <Squares3 className='square'  key={i}></Squares3>) }</div>
           <div className="container"> { squaresRound.map((_, i) => <SquareRound className='square'  key={i}></SquareRound>) }</div>
           <div className="container"> { squares5.map((_, i) => <Squares5 className='square'  key={i}></Squares5>) }</div>
        </>
    )

}

export default NiceAndFun;