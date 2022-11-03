function D({count}) {
    return [...Array(count)].map((_, i) =>  <div key={i} className="circle" style={{backgroundColor:'blue'}}></div>  )}
    export default D;