import { useState } from 'react';
import {Task} from "./types.ts";



export const Modal = ({task, onSave}: {task: Task, onSave: (task: Task) => void}) => {
    const [content, setContent] = useState(task.content);
    const [status, setStatus] = useState(task.status);

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const closeModal = () => {
        const modal = document.querySelector<HTMLDivElement>(".modal-container");
        if (modal) modal.remove()
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>)  => {
        setStatus(e.target.value as "todo" | "doing" | "done");
    }

    const modifytask = () => {
        task.content = content;
        task.status = status;
        if (status !== "done") task.completedAt = undefined;
        const modal = document.querySelector<HTMLDivElement>(".modal-container");
        onSave(task);
        if (modal) modal.remove()
        return task;
    }


    return (
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <form>
                    <label>Contenu de la tâche :</label>
                    <input type="text" value={content} onChange={handleContentChange}/>
                    <label>Statut de la tâche :</label>
                    <select defaultValue={status}  onChange={handleStatusChange}>
                        <option value="todo">TODO</option>
                        <option value="doing">DOING</option>
                        <option value="done">DONE</option>
                    </select>
                    <button className={"modifyButton"} onClick={modifytask}>Submit</button>
                </form>
            </div>
    )
}