import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import DataContext from "./DataContext";
import Line from "./Line";

function List() {
  const { tasks, listDisabled, setTasks } = useContext(DataContext);
  const [sort, setSort] = useState("asc");


  useEffect(() => {
    switch (sort) {
      case "dateAsc":
        setTasks(tasks
          ? [...tasks].sort((a, b) => Date.parse(a.taskDate) - Date.parse(b.taskDate))
          : null);
        break;
      case "dateDesc":
        setTasks(tasks
          ? [...tasks].sort((a, b) => Date.parse(b.taskDate) - Date.parse(a.taskDate))
          : null);
        break;
      case "status1":
        setTasks(tasks
          ? [...tasks].sort((a, b) => a.taskState - b.taskState)
          : null);
        break;
      case "status2":
        setTasks(tasks
          ? [...tasks].sort((a, b) => b.taskState - a.taskState)
          : null);
        break;
      default:
        setTasks(tasks
          ? [...tasks].sort((a, b) => a.id - b.id)
          : null);
        break;
    }
  }, [sort, setTasks]);

  return (
    <div className="card m-2">
      <div className="card-header">
        <h2>My Task List</h2>
        <div className="sortButtons">
          <select className="form-select" aria-label="Default select example" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option defaultValue={"id"}>Select Task Sorting</option>
            <option value="dateAsc">Sort by Task Date asc</option>
            <option value="dateDesc">Sort by Task Date desc</option>
            <option value="status1">Sort by Task Status Not Completed 1st</option>
            <option value="status2">Sort by Task Status Completed 1st</option>
          </select>
        </div>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {tasks ?  tasks.map((a) => (
            <Line key={a.id} task={a}></Line>
          )) : console.log(tasks)}
        </ul>
        {listDisabled ? (
          <div className="loader-screen">
            <div
              className="spinner-border"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            ></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default List;
