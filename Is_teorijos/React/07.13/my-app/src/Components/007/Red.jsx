function Red({setRadius, color, incr2}) {

    

    return (
        <>
        <button onClick={() => setRadius(s => (s) ? 0 : 50)}>O to Square</button>
        <div className="circle" style={{borderColor: [color]}}>{incr2}</div>
        </>


    )
}

export default Red;