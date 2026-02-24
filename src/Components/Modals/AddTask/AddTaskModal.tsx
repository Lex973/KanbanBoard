import './AddTask.css';
import type {Priority, TaskStatus} from "../../../types";
import {type ChangeEvent, type FormEvent, useState} from "react";

interface AddTaskModalProps {
    open: boolean;
    onClose: () => void;
    onCreateTask: (title: string, priority: Priority, status: TaskStatus, time: string) => void;
    handleError: (message: string) => void;
    handleSuccess: (message: string) => void;
}

const AddTaskModal = ({open, onClose, onCreateTask, handleError, handleSuccess}: AddTaskModalProps) => {
    const [nameTask, setNameTask] = useState<string>('');
    const [priorityTask, setPriorityTask] = useState<Priority>('low');
    const [statusTask, setStatusTask] = useState<TaskStatus>('todo');

    if (!open) return null;

    function createTask() {
        if (nameTask.length < 3) {
            handleError('Недопустимая длина задачи');
            return;
        }
        onCreateTask(nameTask, priorityTask, statusTask, '18:00');
        handleSuccess('Задача успешно добавлена!');

        onClose();
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createTask()
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // для кнопки не обязательно, но можно
        createTask()
    };


    return (
        <div className="modal" onClick={onClose}>
            <div
                className="modal-card modal-task"
                onClick={e => e.stopPropagation()}
            >

                <button
                    className="modal-close"
                    aria-label="close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="modal-title">
                    ➕ Новая задача
                </div>

                <form action="" onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
                    <input
                        id="titleInput"
                        value={nameTask}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setNameTask(event.target.value)
                        }
                        placeholder="Название задачи"
                    />
                </form>

                <select id="priorityInput" onChange={(event: ChangeEvent<HTMLSelectElement>) => setPriorityTask(event.target.value as Priority)}>
                    <option value="high">Высокий приоритет</option>
                    <option value="medium">Средний приоритет</option>
                    <option value="low">Низкий приоритет</option>
                </select>

                <select id="columnInput" onChange={(event: ChangeEvent<HTMLSelectElement>) => setStatusTask(event.target.value as TaskStatus)}>
                    <option value="todo">К выполнению</option>
                    <option value="progress">В процессе</option>
                    <option value="done">Завершено</option>
                </select>

                <button
                    id="createTask"
                    className="primary"
                    onClick={handleButtonClick}
                >
                    Создать задачу
                </button>

            </div>
        </div>
    );
};

export default AddTaskModal;