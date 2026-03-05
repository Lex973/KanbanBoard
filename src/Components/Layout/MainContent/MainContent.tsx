import Header from "./Header/Header.tsx";
import Board from "./Board/Board.tsx";
import {useRef, useState} from "react";
import type {Priority, Task, TaskStatus} from "../../../types";
import AddTaskModal from "../../Modals/AddTask/AddTaskModal.tsx";
import {createPortal} from "react-dom";
import GlassNotify from "../../Modals/Notify/GlassNotify.tsx";
import {useFormState} from "../../../hooks/useFormState.ts";
import {useFilteredAndSearchedTasks} from "../../../hooks/useTasks.ts";
import ConfirmModal from "../../Modals/ConfirmModal/ConfirmModal.tsx";

const MainContent = () => {
    let nextId = useRef(6);

    const [open, setOpen] = useState(false);
    const { handleError, handleSuccess, notifyOpen, notifyMessage, notifyType } = useFormState()

    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    let confirmResolver = useRef<((value: boolean) => void) | null>(null);

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title:"Настроить базу данных",
            priority:"high",
            status: 'todo',
            deadLine: '22-02-1999'
        },
    ]);

    const [priorityFilter, setPriorityFilter] = useState<Priority>('all');
    const [searchQuery, setSearchQuery] = useState("");

    const sortedAndSearchedTasks = useFilteredAndSearchedTasks({searchQuery, priorityFilter, tasks})

    function onClose() {
        setOpen(false);
    }

    function onCreateTask(title: string, priority: Priority, status: TaskStatus, deadLine: string): void {
        const newTask = {
            id: nextId.current++,
            title,
            priority,
            status,
            deadLine
        }
        setTasks(prev => [...prev, newTask]);
    }

    function confirm(): Promise<boolean> {
        setOpenConfirmModal(true)

        return new Promise(resolve => {
            confirmResolver.current = resolve;
        })
    }

    function confirmYes() {
        confirmResolver.current?.(true);
        setOpenConfirmModal(false);
    }
    function confirmNo() {
        confirmResolver.current?.(false);
        setOpenConfirmModal(false)
    }

    async function onClear() {
        const confirmed = await confirm()
        if (confirmed) setTasks([]);
    }

    const isSearchEmpty = tasks.length !== 0 && sortedAndSearchedTasks.length === 0;
    return (
        <section style={{width:'100%'}}>
            {openConfirmModal && createPortal(<ConfirmModal confirmYes={confirmYes} confirmNo={confirmNo}/>, document.body)}

            <Header setOpen={setOpen} onFilter={setPriorityFilter} onSearch={setSearchQuery} value={priorityFilter} onClear={onClear}/>

            {isSearchEmpty
                ? <h1 style={{color: "white", marginLeft: 24}}>Ничего не найдено</h1>
                : <Board
                    tasks={sortedAndSearchedTasks}
                    setTasks={setTasks}
                />
            }

            {notifyOpen && createPortal(
                <GlassNotify open={notifyOpen} message={notifyMessage} type={notifyType}/>,
                document.body
            )}
            {open && <AddTaskModal onCreateTask={onCreateTask} open={open} onClose={onClose} handleSuccess={handleSuccess} handleError={handleError}/>}
        </section>
    );
};

export default MainContent;