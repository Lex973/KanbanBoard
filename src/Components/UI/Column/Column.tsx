import './Column.css';
import type {Task} from "../../../types";
import {motion} from "framer-motion";
import { memo } from "react";
import {getDeadLineInfo} from "../../../utils/deadline.ts";

interface ColumnProps {
    status: string;
    title: string;
    tasks: Array<Task>,
    index: number,
    isDragOver: boolean;
    onDragStart: (taskId: number) => void;
    onDragOver: (e: React.DragEvent, columnStatus: string) => void;
    onDrop: (dropStatus: string) => void;
    onDragLeave: () => void;
    now: Date;
}
const Column = ({title, tasks, status, index, isDragOver, onDragStart, onDragOver, onDragLeave, onDrop, now}: ColumnProps) => {
    const delay = index * 0.1;
    const filteredTasks = tasks.filter(task => task.status === status)

    return (
        <motion.div initial={{opacity: 0, translateY: 30}} animate={{opacity: 1, translateY: 0}} transition={{delay: delay, duration: 1, type: 'spring'}}>
            <div className={`column ${isDragOver ? 'column-active' : ''}`}
                 onDragOver={(e) => onDragOver(e, status)}
                 onDragLeave={onDragLeave}
                 onDrop={() => onDrop(status)}
            >
                <div className="columnHeader">
                    <div className="columnTitle">{title}</div>
                    <div className="columnGoida">
                        div.
                        <div className="counter">{filteredTasks.length}</div>
                    </div>
                </div>

                <div className="tasks">
                    {filteredTasks.map((task) => {
                        const getDeadLine = getDeadLineInfo(task.deadLine, now)
                        const isInActive = status === 'done' || status === 'archive';

                        return <div
                            key={task.id}
                            className={`task ${isInActive ? 'taskDone' : ''}`}
                            draggable={true}
                            onDragStart={() => onDragStart(task.id)}
                        >
                                <div className="taskTitle">{task.title}</div>
                                <div className="meta">
                                    <span className={`${isInActive ? 'deadline-archive' : ''} ${getDeadLine.status}`}>{task.deadLine}</span>
                                    <span className={task.priority}>{task.priority}</span>
                                </div>
                            </div>
                    })}
                </div>

                <button className="addTask">
                    + Добавить задачу
                </button>
            </div>
        </motion.div>
    );
};

export default memo(Column);