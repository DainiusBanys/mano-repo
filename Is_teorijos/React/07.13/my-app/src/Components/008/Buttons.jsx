function Buttons({setVisible}) {

    

    return (
        <>
        <button onClick={() => setVisible(1)}>View1</button>
        <button onClick={() => setVisible(2)}>View2</button>
        <button onClick={() => setVisible(3)}>View3</button>
        </>


    )
}

export default Buttons;