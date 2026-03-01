import Column from "../../../UI/Column/Column.tsx";
import type {Task, TaskStatus} from "../../../../types";
import './Board.css'
import {useCallback, useEffect, useRef, useState} from "react";

interface BoardProps {
    tasks: Array<Task>;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Board = ({tasks, setTasks}: BoardProps) => {
    const columns = [
        { id: 1, status: 'todo', title: 'К выполнению' },
        { id: 2, status: 'progress', title: 'В процессе' },
        { id: 3, status: 'done', title: 'Завершено' },
        { id: 4, status: 'archive', title: 'Архив' },
    ];

    const dragTaskId = useRef<number | null>(null)

    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

    const handleDragStart = useCallback((taskId: number) => {
        dragTaskId.current = taskId;
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent, columnStatus: string) => {
        e.preventDefault();

        if (dragOverColumn !== columnStatus) {
            setDragOverColumn(columnStatus);
        }
    }, [dragOverColumn]);

    const handleDragLeave = useCallback(() => {
        setDragOverColumn(null);
    }, []);

    const handleDrop = useCallback((dropStatus: string) => {
        setTasks(prev => prev.map(task =>
            task.id === dragTaskId.current ? {...task, status: dropStatus as TaskStatus} : task
        ));
        setDragOverColumn(null);
    }, []);


    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date())
        }, 5000)

        return () => clearInterval(interval)
    }, []);

    return (
        <div className="board">
            {columns.map((column, index) => (
                <Column
                    key={column.id}
                    status={column.status}
                    title={column.title}
                    tasks={tasks}
                    index={index}
                    isDragOver={dragOverColumn === column.status}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    now={now}
                />
            ))}
        </div>
    );
};

export default Board;