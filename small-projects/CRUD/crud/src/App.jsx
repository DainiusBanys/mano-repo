import './bootstrap.css'
import './App.scss';
import Create from './Components/Create';

function App() {
  return (
<>
      <h1> CRUD appsas </h1>  

      <div className="container text-center">
  <div className="row">
    <div className="col-5">
    <Create/>
    </div>
    <div className="col-7">
      Column
    </div>
  </div>
</div>
</>
      );
}

export default App;