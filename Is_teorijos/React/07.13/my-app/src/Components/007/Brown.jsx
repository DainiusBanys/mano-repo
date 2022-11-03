import randColor from "../../Functions/randomColor"

function Brown({setColor, radius, incr1}) {

    return (
    <>
        <button onClick={() => setColor(s => s = randColor())}>Color</button>
        <div className="circle" style={{borderRadius: [radius]+'%'}}>{incr1}</div>
    </>
    )
    
    }
    
    export default Brown