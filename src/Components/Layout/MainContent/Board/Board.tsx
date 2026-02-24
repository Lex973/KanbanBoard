import Column from "../../../UI/Column/Column.tsx";
import type {Task} from "../../../../types";
import './Board.css'
interface BoardProps {
    tasks: Array<Task>;
}

const Board = ({tasks}: BoardProps) => {
    const columns = [
        { id: 1, status: 'todo', title: 'К выполнению' },
        { id: 2, status: 'progress', title: 'В процессе' },
        { id: 3, status: 'done', title: 'Завершено' },
        { id: 4, status: 'archive', title: 'Архив' },
    ];


    return (
        <div className="board">
            {columns.map((column, index) => (
                <Column key={column.id} status={column.status} title={column.title} tasks={tasks} index={index}/>
            ))}
        </div>
    );
};

export default Board;