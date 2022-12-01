import "./bootstrap.css";
import "./App.scss";
import axios from "axios";
import Create from "./Components/Create";
import { useState } from "react";
import { useEffect } from "react";
import DataContext from "./Components/DataContext";
import List from "./Components/List";
import Edit from "./Components/Edit";
import Messages from "./Components/Messages";
import rand from "./Functions/rand";

function App() {
  const [lastUpdate, setLastUpdate] = useState(Date.now()); // kad automatskai atnaujinti duomenis
  const [tasks, setTasks] = useState(null); // perduoti ivedamus duomenis
  const [createData, setCreateData] = useState(null); // irasyti i db
  const [deleteData, setDeleteData] = useState(null); // istrinti is db
  const [editData, setEditData] = useState(null); // irasyti pakeitimus i db
  const [modalData, setModalData] = useState(null); // valdyti modala, kad atsirastu ir dingtu

  const [messages, setMessages] = useState([]);

  // atnaujina sarasa ekrane

  //LOADER

  const [createDisabled, setCreateDisabled] = useState(false);
  const [listDisabled, setListDisabled] = useState(false);

  //READ
  useEffect(() => {
    setListDisabled(true);
    axios.get("http://localhost:3003/list").then((res) => {
      setTasks(res.data);
      setListDisabled(false);
    });
  }, [lastUpdate]);

  //CREATE
  useEffect(() => {
    if (createData === null) {
      return;
    }
    setCreateDisabled(true);
    axios.post("http://localhost:3003/list", createData).then((res) => {
      setLastUpdate(Date.now());
      msg(...res.data.msg);
      setCreateDisabled(false);
    });
  }, [createData]);

  //DELETE
  useEffect(() => {
    if (deleteData === null) {
      return;
    }
    setListDisabled(true);
    axios.delete("http://localhost:3003/list" + deleteData.id).then((res) => {
      setLastUpdate(Date.now());
      msg(...res.data.msg);
    });
  }, [deleteData]);

  // UPDATE
  useEffect(() => {
    if (editData === null) {
      return;
    }
    setListDisabled(true);
    axios
      .put("http://localhost:3003/list" + editData.id, editData)
      .then((res) => {
        setLastUpdate(Date.now());
        msg(...res.data.msg);
      });
  }, [editData]);

  const msg = (type, text) => {
    const mes = { type, text, id: rand(1000000, 9999999) }; // sukuriam pranesima, su rand generuojam pranesimo id, kad galima butu istrinti(neberodyti) reikiamo pranesimo
    setTimeout(() => {
      setMessages((m) => m.filter((mm) => mm.id !== mes.id)); // paleidziam taimeri pranesimui, kad istrintu automatiskai po taimero
    }, 4000);
    setMessages((m) => [...m, mes]); // prideda prie pranesimu nauja message (parodom)
  };

  return (
    <DataContext.Provider
      value={{
        setCreateData,
        tasks,
        setDeleteData,
        modalData,
        setModalData,
        setEditData,
        messages,
        msg,
        createDisabled,
        listDisabled,
        setTasks,
      }}
    >
      <div className="card text-center">
        <h1 className="card-title"> My To Do List </h1>

        <div className="container text-center">
          <div className="row">
            <div className="card">
              <div className="card-body">
                <Create />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="card">
              <div className="card-body">
                <List />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Edit />
      <Messages />
    </DataContext.Provider>
  );
}

export default App;
