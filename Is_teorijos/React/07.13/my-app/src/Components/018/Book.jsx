import randColor from '../../Functions/randomColor';
import BooksContext from './BooksContext';
import { useState } from 'react';
import { useContext } from "react";

function Book({book, cat}) {

    const { addToCart } = useContext(BooksContext);
    const [count, setCount] = useState(1);

    const goUp = () => {
        setCount(c => c + 1);
    }

    const goDown = () => {
        setCount(c => Math.max(1, c - 1));
    }


    return (
        <li className="li-book" style={{backgroundColor: randColor()}}>
            <div className="cat">{cat}</div>
            <h2>{book.title}</h2>
            <img src={book.img} alt={book.title} />
            <div className="author">{book.author}</div>
            <div className="bottom">
            <button className="red" onClick={() => addToCart(book.id, count)}>Pirkti</button>
            <div className="counter">
                    <svg className="up" onClick={goUp}>
                        <use href="#arrow"></use>
                    </svg>
                    <span>{count}</span>
                    <svg className="down" onClick={goDown}>
                        <use href="#arrow"></use>
                    </svg>
                </div>
            <div className="price">{book.price} EUR</div>
            </div>
        </li>
    )

}

export default Book;