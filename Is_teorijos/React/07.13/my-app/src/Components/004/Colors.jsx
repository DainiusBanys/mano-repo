function Colors({backgroundColor, color}) {

if (backgroundColor === color) {  backgroundColor = 'gray'; color = 'red'  }
    return (<div className="squares" style={{backgroundColor: [backgroundColor] , color: [color] , padding:"30px"}}>Text </div>)
}

export default Colors;


