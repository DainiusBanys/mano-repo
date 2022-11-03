function Square({width, height}) {

if (width > 100) {  width = '100';  }
 if (height > 100) {height = '100'}
    return (<div className="squares" style={{width: [width]+'px' , height: [height]+'px'}}> </div>)
}

export default Square;


