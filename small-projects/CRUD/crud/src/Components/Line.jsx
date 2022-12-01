import { useContext } from "react";
import DataContext from "./DataContext";

function Line({ task }) {
  const { setDeleteData, setModalData } = useContext(DataContext); // duomenu perdavimas is App per konteksta
 

  const clickDelete = () => {
    setDeleteData({ id: task.id });
  };

  const clickEdit = () => {
    setModalData(task);
  };





  return (
    <li
      className="list-group-item"
      style={{
        backgroundColor: task.taskState ? "lightgray" : "",
        textDecoration: task.taskState ? "line-through" : "",
      }}
    >
      <div className="bin">
        <div className="content">
          <i>{task.taskDate}</i>
          <h3>{task.type}</h3>
        </div>
        <div className="control">


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
