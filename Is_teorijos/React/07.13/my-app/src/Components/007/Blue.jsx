function Blue({setCount}) {

    

    return (
        <>
        <button onClick={(s) => setCount(s => s + 1)}>+1</button>
        </>


    )
}

export default Blue;