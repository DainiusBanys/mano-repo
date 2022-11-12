import { useContext, useId, useState } from "react";
import DataContext from "./DataContext";

function Line({ task }) {
  const { setDeleteData, setModalData } = useContext(DataContext); // duomenu perdavimas is App per konteksta
  const [checked, setChecked] = useState(false);

  const clickDelete = () => {
    setDeleteData({ id: task.id });
  };

  const clickEdit = () => {
    setModalData(task);
  };

  const id = useId();

  const handleChange = () => {
    setChecked(!checked);
    // galima pagal checked togle daryti klase ant selectby dom komponento
  };

  return (
    <li
      className="list-group-item"
      style={{
        backgroundColor: checked ? "lightgray" : "",
        textDecoration: checked ? "line-through" : "",
      }}
    >
      <div className="bin">
        <div className="content">
          <i>{task.taskDate}</i>
          <h3>{task.type}</h3>
        </div>
        <div className="control">
          <div>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              className="btn-check"
              id={id}
              autoComplete="off"
            />
            <label className="btn btn-outline-primary" htmlFor={id}>
              Job Done
            </label>
            <br />
          </div>

          <button
            type="button"
            onClick={clickEdit}
            className="btn btn-outline-success m-1"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={clickDelete}
            className="btn btn-outline-danger m-1"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;
