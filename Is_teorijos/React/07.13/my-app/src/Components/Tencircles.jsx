function Tencircles({qty}) {
    return [...Array(qty)].map((_, i) =>   <div key={i} className="circle">{i+1}</div>  )}

    export default Tencircles;