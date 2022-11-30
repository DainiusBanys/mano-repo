import { useEffect } from "react";
import { useContext, useId, useState } from "react";
import DataContext from "./DataContext";

function Edit() {
  const { modalData, setModalData, setEditData, msg } = useContext(DataContext);
  const [type, setType] = useState("");
  const [taskState, setTaskState] = useState(false);
  const [taskDate, setTaskDate] = useState("");

  const id = useId();

  const handleChange = () => {
    setTaskState(!taskState);
    // galima pagal checked togle daryti klase ant selectby dom komponento
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setType(modalData.type); // sitas efektas paima ivestas reiksmes ir sudeda i modalo inputa
    setTaskDate(modalData.taskDate);
    setTaskState(modalData.taskState);
  }, [modalData]);

  const clickSave = () => {
    let error = false;
    if (/^\s*$/.test(type)) {
      // tikrinam su regexu ar neivede tik vieno ar keliu tarpu
      msg("danger", "Add description first");
      error = true;
    }
    if (error) {
      return;
    }
    setEditData({ type, taskDate, taskState, id: modalData.id }); // issaugo pakeitimus i localstorage
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={taskState}
              onChange={handleChange}
              id={id}
              aria-label="taskState"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Job Done
            </label>
          </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={clickSave}
            >
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
