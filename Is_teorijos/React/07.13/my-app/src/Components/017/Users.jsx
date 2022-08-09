import { useEffect, useState } from "react";
import axios from 'axios'

function Users() {
    const [users, setUsers] = useState(null)

    useEffect(()=> {   

        axios.get('https://jsonplaceholder.typicode.com/users').then(res => setUsers(res.data));

     }, [])

const sortas = () => {
    setUsers(u => [...u].sort((a,b) => a.name.localeCompare(b.name)))
}
const unsortas = () => {
    setUsers(u => [...u].sort((a,b) => a.id - b.id))
}

return (
    <>
    <ul>
        {
            users?.map(u => <li key = {u.id}> {u.name} <span>---</span> {u.address.city}  <span>---</span>  {u.company.name}</li>)
    
        }
    </ul>

    <button onClick={sortas}>Sort by name</button>;
    <button onClick={unsortas}>Sort by default</button>
    </>
)
    }
export default Users;