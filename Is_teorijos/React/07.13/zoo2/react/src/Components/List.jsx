import { useContext } from "react";
import DataContext from "./DataContext";
import Line from "./Line";

function List() {

    const { animals, listDisabled, setSort, sort } = useContext(DataContext);


    return (
        <div className="card m-2">
            <div className="card-header">
                <h2>List</h2>
                <button type="button" onClick={() => setSort('az')} className={'btn btn-outline-' + (sort === 'az' ? 'info' : 'secondary')}>Name AZ</button>
                <button type="button" onClick={() => setSort('za')} className={'btn btn-outline-' + (sort === 'za' ? 'info' : 'secondary')}>Name ZA</button>
                <button type="button" onClick={() => setSort('09')} className={'btn btn-outline-' + (sort === '09' ? 'info' : 'secondary')}>Weight min/max</button>
                <button type="button" onClick={() => setSort('90')} className={'btn btn-outline-' + (sort === '90' ? 'info' : 'secondary')}>Weight max/min</button>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                        animals?.map(a => <Line key={a.id} animal={a}></Line>)
                    }

                </ul>
                {
                    listDisabled ?
                        <div className="loader-screen">
                            <div className="spinner-border" style={{
                                width: '4rem',
                                height: '4rem'
                            }} role="status">
                            </div>
                        </div> :
                        null
                }
            </div>
        </div>
    );
}

export default List;