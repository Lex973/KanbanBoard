import type {User} from "@supabase/supabase-js";

export interface IUser {
    id: string;
    email: string;
    name?: string;
    createdAt?: string;
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

export interface CustomAuthResponseUserInfo{
    user: User | null;
    email: string | null;
    name: string | null;
    error: string | null;
}