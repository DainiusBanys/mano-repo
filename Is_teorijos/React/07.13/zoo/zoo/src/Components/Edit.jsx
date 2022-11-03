import { useEffect } from "react";
import { useContext, useState } from "react";
import DataContext from "./DataContext";

function Edit() {

    const { modalData, setModalData, setEditData, msg } = useContext(DataContext);
    const [type, setType] = useState('');
    const [weight, setWeight] = useState('');

    useEffect(() => {
        if (null === modalData) {
            return;
        }
        setType(modalData.type);
        setWeight(modalData.weight);

    }, [modalData]);

    const clickSave = () => {
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
        setEditData({type, weight, id: modalData.id});
        setModalData(null);
    }

    if (null === modalData) {
        return null;
    }




    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit</h5>
                        <button type="button" className="close" onClick={() => setModalData(null)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-primary" onClick={clickSave}>Save changes</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setModalData(null)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;