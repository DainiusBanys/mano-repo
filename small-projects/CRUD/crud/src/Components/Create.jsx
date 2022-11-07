import { useState } from "react";

function Create() {

const [type, setType] = useState('');
const [weight, setWeight] = useState('');


    return (

                <div className="card m-2">
            <div className="card-header">
                <h2>New</h2>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Animal type</label>
                    <input aria-label="Animal type" type="text" value={type} onChange={e => setType(e.target.value)} className="form-control" placeholder="Enter your animal type" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Weight</label>
                    <input aria-label="Animal type" type="text" value={weight} onChange={e => setWeight(e.target.value)} className="form-control" placeholder="Enter your animal weigth" />
                </div>
                <button type="button" class="btn btn-outline-info m-3">Add</button>
            </div>
            
        </div>

    )
}

export default Create;