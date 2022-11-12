import { useContext } from "react";
import DataContext from "./DataContext";
import Line from "./Line";

function List() {
  const { tasks } = useContext(DataContext);

  return (
    <div className="card m-2">
      <div className="card-header">
        <h2>My Task List</h2>
      </div>
      <div className="card-body">
        <ul className="list-group">
{
  tasks?.map(a => <Line key={a.id} task={a}></Line>)
}
        </ul>
      </div>
    </div>
  );
}

export default List;
