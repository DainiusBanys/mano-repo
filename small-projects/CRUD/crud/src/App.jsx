import "./bootstrap.css";
import "./App.scss";
import Create from "./Components/Create";
import { useState } from "react";
import { useEffect } from "react";
import { create, destroy } from "./Functions/localStorage";
import { read, edit } from "./Functions/localStorage";
import DataContext from "./Components/DataContext";
import List from "./Components/List";
import Edit from "./Components/Edit";
import Messages from "./Components/Messages";
import rand from "./Functions/rand";

const localStorageKey = "tasks";

function App() {
  const [lastUpdate, setLastUpdate] = useState(Date.now()); // kad automatskai atnaujinti duomenis
  const [tasks, setTasks] = useState(null); // perduoti ivedamus duomenis
  const [createData, setCreateData] = useState(null); // irasyti i local storage
  const [deleteData, setDeleteData] = useState(null); // istrinti is local storage
  const [editData, setEditData] = useState(null); // irasyti pakeitimus i local storage
  const [modalData, setModalData] = useState(null); // valdyti modala, kad atsirastu ir dingtu

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setTasks(read(localStorageKey)); // atnaujina sarasa ekrane
  }, [lastUpdate]);

  useEffect(() => {
    if (createData === null) {
      return;
    }
    create(localStorageKey, createData);
    setLastUpdate(Date.now());
    msg("success", "All good!");
  }, [createData]);

  useEffect(() => {
    if (deleteData === null) {
      return;
    }
    destroy(localStorageKey, deleteData.id);
    setLastUpdate(Date.now());
    msg("info", "Deleted!");
  }, [deleteData]);

  useEffect(() => {
    if (editData === null) {
      return;
    }
    edit(localStorageKey, editData, editData.id);
    setLastUpdate(Date.now());
    msg("info", "Update success!");
  }, [editData]);

  const msg = (type, text) => {
    const mes = { type, text, id: rand(1000000, 9999999) }; // sukuriam pranesima, su rand generuojam pranesimo id, kad galima butu istrinti(neberodyti) reikiamo pranesimo
    setTimeout(() => {
      setMessages((m) => m.filter((mm) => mm.id !== mes.id)); // paleidziam tameri pranesimui, kad istrintu automatiskai po taimero
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
