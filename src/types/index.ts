import type {ChangeEvent} from "react";

export interface IUser {
    id: number;
    name: string;
    email: string;
}


export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'archive';
export type Priority = 'low' | 'medium' | 'high';

export interface ITask {
    id: number;
    title: string;
    time: Date;
    status: TaskStatus;
    priority: Priority;
    createdAt: Date;
}

export interface UseInputReturn  {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
