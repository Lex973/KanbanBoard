import Header from "./Header/Header.tsx";
import Board from "./Board/Board.tsx";
import {useEffect, useRef, useState} from "react";
import type {Priority, Task, TaskStatus} from "../../../types";
import AddTaskModal from "../../Modals/AddTask/AddTaskModal.tsx";
import {createPortal} from "react-dom";
import GlassNotify from "../../Modals/Notify/GlassNotify.tsx";
import {useFormState} from "../../../hooks/useFormState.ts";
import {useFilteredAndSearchedTasks} from "../../../hooks/useTasks.ts";

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

    const [priorityFilter, setPriorityFilter] = useState<Priority>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchQueryEmpty, setIsSearchQueryEmpty] = useState(false);

    const sortedAndSearchedTasks = useFilteredAndSearchedTasks({searchQuery, priorityFilter, tasks})

    useEffect(() => {
        setIsSearchQueryEmpty(sortedAndSearchedTasks.length === 0)
    }, [sortedAndSearchedTasks])

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
            <Header setOpen={setOpen} onFilter={setPriorityFilter} onSearch={setSearchQuery} value={priorityFilter}/>

            {isSearchQueryEmpty ? <h1 style={{color: "white", marginLeft: 24}}>Ничего не найдено</h1> : <Board tasks={sortedAndSearchedTasks}/>}

            {notifyOpen && createPortal(
                <GlassNotify open={notifyOpen} message={notifyMessage} type={notifyType}/>,
                document.body
            )}
            {open && <AddTaskModal onCreateTask={onCreateTask} open={open} onClose={onClose} handleSuccess={handleSuccess} handleError={handleError}/>}
        </section>
    );
};

export default MainContent;