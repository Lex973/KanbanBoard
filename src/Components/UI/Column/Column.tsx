import './Column.css';
import type {Task} from "../../../types";
import {motion} from "framer-motion";

interface ColumnProps {
    status: string;
    title: string;
    tasks: Array<Task>,
    index: number,
}
const Column = ({title, tasks, status, index}: ColumnProps) => {
    console.log(index)

    const delay = index * 0.1;

    const priorityWeight = {
        high: 1,
        medium: 2,
        low: 3,
    }

    const filteredTasks = tasks.filter(task => task.status === status)
    return (
        <motion.div initial={{opacity: 0, translateY: 30}} animate={{opacity: 1, translateY: 0}} transition={{delay: delay, duration: 1, type: 'spring'}}>
            <div className="column">
                <div className="columnHeader">
                    <div className="columnTitle">{title}</div>
                    <div className="counter">{filteredTasks.length}</div>
                </div>

                <div className="tasks">
                    {filteredTasks.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]).map((task) => {
                        return <div key={task.id} className="task">
                            <div className="taskTitle">{task.title}</div>
                            <div className="meta">
                                <span>{task.time}</span>
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

export default Column;