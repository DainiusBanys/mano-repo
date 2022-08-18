function Animals({show}) {


    return (
        <>
        <h2>Animals Page: {show.type}</h2>
        <div className="container">
            <div className="sc" style={{backgroundColor: show.color}}>
                {show.tail}
            </div>
        </div>
        </>
    );

}
export default Animals;