import {useMemo} from "react";
import type {Priority, Task} from "../types";

interface UseTasksProps {
    tasks: Task[];
    priorityFilter: Priority;
    searchQuery?: string | undefined;
}

export const useFilteredTasks = ({tasks, priorityFilter}: UseTasksProps) => {
    return useMemo(() => {
        if (priorityFilter === "all") return tasks;

        return tasks.filter(task => task.priority === priorityFilter)
    }, [tasks, priorityFilter])
}

export const useFilteredAndSearchedTasks = ({searchQuery = '', tasks, priorityFilter}: UseTasksProps) => {
    const filteredTasks = useFilteredTasks({tasks, priorityFilter});

    return useMemo(() => {
        return filteredTasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, filteredTasks])
}
