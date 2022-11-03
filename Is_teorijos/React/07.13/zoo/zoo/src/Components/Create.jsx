import { useContext } from "react";
import { useState } from "react";
import DataContext from "./DataContext";

function Create() {

    const [type, setType] = useState('');
    const [weight, setWeight] = useState('');
    const { setCreateData, msg } = useContext(DataContext);

    const clickAdd = () => {
        let error = false;
        if (type === '') {
            msg('danger', 'Please enter animal type');
            error = true;
        }
        if (weight === '') {
            msg('danger', 'Please enter animal weight');
            error = true;
        }
        if (error) {
            return;
        }
        setCreateData({type, weight});
        setType('');
        setWeight('');
    }

    return (
        <div className="card m-2">
            <div className="card-header">
                <h2>New</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Animal type</label>
                    <input type="text" className="form-control" value={type} onChange={e => setType(e.target.value)} />
                    <small className="form-text text-muted">Enter your animal type or name here.</small>
                </div>
                <div className="form-group">
                    <label>Weight</label>
                    <input type="text" className="form-control" value={weight} onChange={e => setWeight(e.target.value)} />
                    <small className="form-text text-muted">How is big and fat your animal?</small>
                </div>
                <button type="button" onClick={clickAdd} className="btn btn-outline-info m-3">Add</button>
            </div>
        </div>
    );
}

export default Create;