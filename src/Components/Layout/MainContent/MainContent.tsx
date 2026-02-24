import Header from "./Header/Header.tsx";
import Board from "./Board/Board.tsx";
import {useRef, useState} from "react";
import type {Priority, Task, TaskStatus} from "../../../types";
import AddTaskModal from "../../Modals/AddTask/AddTaskModal.tsx";
import {createPortal} from "react-dom";
import GlassNotify from "../../Modals/Notify/GlassNotify.tsx";
import {useFormState} from "../../../hooks/useFormState.ts";

const MainContent = () => {
    let nextId = useRef(6);

    const [open, setOpen] = useState(false);
    const { handleError, handleSuccess, notifyOpen, notifyMessage, notifyType } = useFormState()

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title:"Настроить базу данных",
            priority:"high",
            status: 'todo',
            time:"09:00"
        },
        {
            id: 2,
            title:"Настроить получение данных",
            priority:"low",
            status: 'progress',
            time:"09:00"
        },
        {
            id: 3,
            title:"Сделать регистрацию",
            priority:"medium",
            status: 'done',
            time:"09:00"
        },
        {
            id: 4,
            title:"Настроить базу данных еще раз",
            priority:"low",
            status: 'todo',
            time:"09:00"
        },
        {
            id: 5,
            title:"Настроить базу данных еще раз",
            priority:"high",
            status: 'todo',
            time:"09:00"
        },
    ]);

    function onClose() {
        setOpen(false);
    }
    function onCreateTask(title: string, priority: Priority, status: TaskStatus, time: string): void {
        const newTask = {
            id: nextId.current++,
            title,
            priority,
            status,
            time
        }
        setTasks([...tasks, newTask]);
    }
    return (
        <section style={{width:'100%'}}>
            <Header setOpen={setOpen}/>

            <Board tasks={tasks}/>
            {open && <AddTaskModal onCreateTask={onCreateTask} open={open} onClose={onClose} handleSuccess={handleSuccess} handleError={handleError}/>}

            {notifyOpen && createPortal(
                <GlassNotify open={notifyOpen} message={notifyMessage} type={notifyType}/>,
                document.body
            )}
        </section>
    );
};

export default MainContent;