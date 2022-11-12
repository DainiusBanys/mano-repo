import { useEffect } from "react";
import { useContext, useState } from "react";
import DataContext from "./DataContext";

function Edit() {
  const { modalData, setModalData, setEditData } = useContext(DataContext);
  const [type, setType] = useState("");
  const [taskDate, setTaskDate] = useState('');

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setType(modalData.type); // sitas efektas paima ivestas reiksmes ir sudeda i modalo inputa
     setTaskDate(modalData.taskDate);
  }, [modalData]);

  const clickSave = () => {
setEditData({type, taskDate, id: modalData.id}); // issaugo pakeitimus i localstorage
setModalData(null); // uzdaro modala

  };

  if (null === modalData) {
    return null; // kol modal data reiksme yra null - grazinamas ne modalas zemau o is karto return null
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setModalData(null)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Task description</label>
              <input
                aria-label="Task description"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-control"
                placeholder="Enter changed task description"
              />
            </div>
            {/* <div className="mb-3">
              <label className="form-label">Weight</label>
              <input
                aria-label="task type"
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="form-control"
                placeholder="Enter your task weigth"
              />
            </div> */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={clickSave}>
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setModalData(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
