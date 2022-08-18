function Circle({circle, setCircles, circles}) {


    const move = () => {
        if (circle.side === 'left') {
            // console.log(circles.map(cir => circle.id === cir.id ? {...cir, side: 'right'} : {...cir}))

            const ci = circles.map(cir => circle.id === cir.id ? {...cir, side: 'right'} : {...cir});
  

            setCircles(ci);
        } else {
            setCircles(circles.map(cir => circle.id === cir.id ? {...cir, side: 'left'} : {...cir}));
        }
    }


    return (
        <div className="nice" onClick={move}>
            <span>{circle.id}</span>
        </div>
    )
}

export default Circle;