import { useContext } from "react";
import { useState } from "react";
import DataContext from "./DataContext";

function Create() {
  const [type, setType] = useState("");
  const [taskDate, setTaskDate] = useState(new Date().toLocaleDateString('lt-LT'));
  // const [weight, setWeight] = useState("");
  const { setCreateData, msg } = useContext(DataContext);
  

  const clickAdd = () => {
    const current = new Date();
    let error = false;
    if (/^\s*$/.test(type)) {
      // tikrinam su regexu ar neivede tik vieno ar keliu tarpu
      msg("danger", "missing type!");
      error = true;
    }
    // if (/^\s*$/.test(weight)) {
    //   msg("danger", "missing weight!");
    //   error = true;
    // }
    if (error) {
      return;
    }
    setTaskDate(`${current.toLocaleDateString('lt-LT')}`);
    
    setCreateData({ type, taskDate });
 
    setType("");
    // setWeight("");
  };

  return (
    <div className="card m-2">
      <div className="card-header">
        <h2>New Task</h2>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">New Task Description</label>
          <input
            aria-label="Task description"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-control"
            placeholder="Enter your task here"
          />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Weight</label>
          <input
            aria-label="Animal type"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="form-control"
            placeholder="Enter your animal weigth"
          />
        </div> */}
        <button
          type="button"
          onClick={clickAdd}
          className="btn btn-outline-info m-3"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Create;
