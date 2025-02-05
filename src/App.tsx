import { useState } from 'react';
import './App.css';
import { tasksCollection } from './data.ts';
import {Task} from "./types.ts";
import {Modal} from "./Modal.tsx";
import {createRoot} from "react-dom/client";

function App() {
  const [tasks, setTasks] = useState(tasksCollection);

  const addNewTask = (content : string):void=>{
    const newTask : Task = {
      id: tasks.length + 1,
      content: content,
      status: "todo",
      createdAt: new Date()
    }
    setTasks([...tasks, newTask]);
  }

  const whenAddButtonIsClicked = () :void => {
    const content = prompt("Entrez le contenu de la tâche");
    if(content){
        addNewTask(content);
    }
    else{
        alert("Veuillez saisir le contenu de la tâche");
    }
  }
  const validateTask = (task : Task) :void => {
      task.status = "done";
      task.completedAt = new Date();
      setTasks([...tasks]);
  }
  const modifyTaskModal = (task : Task) :void => {
      // Old version
      // const newStatus = prompt("Choisissez le nouveau statut de la tâche (doing/todo):", task.status);
      // if (newStatus === "doing" || newStatus === "todo") {
      //     task.status = newStatus;
      //     task.completedAt = undefined;
      //     setTasks([...tasks]);
      // }
      // New version with the form in Modal.tsx
      const modalContainer = document.createElement("div");
      modalContainer.classList.add('modal-container')
      document.body.appendChild(modalContainer);
      createRoot(modalContainer).render(<Modal task={task} onSave={updateTask} />);
  }

  const updateTask = (updatedTask: Task) :void => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  }

  return (
    <>
      <div className={"containerTask"}>
        <h1>Todo list</h1>
        <p>Nombre de tâches: {tasks.length}</p>
        <button onClick={()=> whenAddButtonIsClicked()} className={"add"}>Nouvelle Tâche</button>
        <ul>
          {tasks.map(task => (
            <li key={crypto.randomUUID()} className={task.status}>
                {task.status === 'todo' &&
                    <span className={"taskDisplay"}>⏳ - {task.content}
                      <span className={"buttonSpan"}>
                        <button onClick={() =>validateTask(task)}>Valider</button>
                        <button onClick={()=>modifyTaskModal(task)}>Modifier</button>
                      </span>
                    </span>
                }
                {task.status === 'doing' &&
                    <span className={"taskDisplay"}>⌚ - {task.content}
                      <span className={"buttonSpan"}>
                        <button onClick={() =>validateTask(task)}>Valider</button>
                        <button onClick={()=>modifyTaskModal(task)}>Modifier</button>
                      </span>
                    </span>
                }
                {task.status === 'done' &&
                    <span className={"taskDisplay"}>{task.completedAt?.toLocaleDateString()} ✅ - {task.content}
                      <button onClick={()=>modifyTaskModal(task)}>Modifier</button>
                    </span>
                }
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
