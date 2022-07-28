import { useState } from "react";
function Text() {

const [name, setName] = useState('');
const [age, setAge] = useState('');
const [list, setList] = useState([])

const add = () => {
setList(l => [...l,{name, age}])
setName('');
setAge('')
}

const sortName = () => { 
    setList(l => [...l].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
}


const inputHandler = e => {
    setName(e.target.value)
}
const inputHandler1 = e => {
    setAge(e.target.value)
}




// const add = () => {
//     setText( gyvunai?.map((g,i) => <li key={i}>{g.name} - {g.age}</li>));
    
    
return (
    
    <>
<input type="text" placeholder="Žvėris" value ={name} onChange={inputHandler}/>
<div></div>
<input type="text" placeholder="Amžius" value={age} onChange={inputHandler1}/>
<div></div>
<button onClick={add}>Įvesti</button>
<button onClick={sortName}>List by Name</button>
<div>
{list.map((a, i)=> <div key={i}>{i + 1}<span> Gyvūnas: {a.name}</span><span>Amžius:  {a.age} </span></div>)}
</div>
</>
)}

export default Text;