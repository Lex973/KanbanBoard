import type {ChangeEvent} from "react";

export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface ITask {
    id: number;
    title: string;
    time: Date;
    status: 'todo' | 'in-progress' | 'done' | 'archive';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
}

export interface useInputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'archive';
export type Priority = 'low' | 'medium' | 'high';