import type {User} from "@supabase/supabase-js";

export type TaskStatus = 'todo' | 'progress' | 'done' | 'archive';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
    id?: number;
    title: string;
    priority: Priority;
    status: TaskStatus;
    time: string;
}

export interface CustomAuthResponseUserInfo{
    user: User | null;
    email: string | null;
    name: string | null;
    error: string | null;
}