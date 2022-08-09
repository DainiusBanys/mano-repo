import { useEffect, useState } from "react";
import axios from 'axios'
import Book from "./Book";

function Knygos() {
    const [books, setBooks] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(()=> {   

        axios.get('https://in3.dev/knygos/').then(res => setBooks(res.data));

     }, [])
    useEffect(()=> {   

        axios.get('https://in3.dev/knygos/types/').then(res => setCategory(res.data));

     }, [])

// const sortas = () => {
//     setUsers(u => [...u].sort((a,b) => a.name.localeCompare(b.name)))
// }
// const unsortas = () => {
//     setUsers(u => [...u].sort((a,b) => a.id - b.id))
// }

return (
    <ul className="books-list">
        {
            books ? books.map(b => <><Book key={b.id} book={b} cat= {category ? category?.find(c => c.id === b.id)?.title : '---loading---'} />
            
            
            </>) : <li className="loader">
                
            </li>
            }
    </ul>
)

}
    
export default Knygos;