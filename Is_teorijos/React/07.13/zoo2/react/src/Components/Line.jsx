import { useContext } from "react";
import DataContext from "./DataContext";

function Line({ animal }) {

    const {setDeleteData, setModalData} = useContext(DataContext);

    const clickDelete = () => {
        setDeleteData({id: animal.id})
    }

    const clickEdit = () => {
        setModalData(animal);
    }

    return (
        <li className="list-group-item">
            <div className="bin">
                <div className="content">
                    <h3>{animal.type}</h3>
                    <i>{animal.weight} Kg</i>
                </div>
                <div className="control">
                    <button type="button" onClick={clickEdit} className="btn btn-outline-success m-1">Edit</button>
                    <button type="button" onClick={clickDelete} className="btn btn-outline-danger m-1">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;