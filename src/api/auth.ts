import {supabase} from "../supabase-client.ts";
import type {PostgrestSingleResponse} from "@supabase/supabase-js";

export interface CustomAuthResponseSignUp {
    user: {
        id: string | undefined;
        email: string;
        name: string;
        createdAt: string | undefined;
    } | null;

    error: string | null;
}

interface CustomAuthResponseSignIn {
    isSuccess: boolean;
    error: string | null;
}


export const signUp = async (email: string, password: string, name: string): Promise<CustomAuthResponseSignUp> => {
    try {
        const {data, error} = await supabase.auth.signUp({email, password});

        if (error) {
            console.log(error)
            return {user: null, error: "Ошибка регистрации"};
        }

        const signUpUser: PostgrestSingleResponse<null> = await supabase.from('profiles').insert({id: data.user?.id, email: email, name: name});

        if (signUpUser.error) {
            console.log("Ошибка: ", signUpUser.error)
            return { user: null, error: 'Ошибка сохранения профиля' };
        }

        const user = {
            id: data.user?.id,
            email: data.user?.email ?? '',
            name: name,
            createdAt: data.user?.created_at
        }

        return { user, error: null }
    }
    catch (error) {
        let errorMessage = '';
        error instanceof Error ? errorMessage = error.message : errorMessage = String(error);

        return {
            user: null,
            error: errorMessage,
        }
    }
}

export const signIn = async (email: string, password: string): Promise<CustomAuthResponseSignIn> => {
    try {
        const {data, error} = await supabase.auth.signInWithPassword({email, password});

        if (error) {
            return { isSuccess: false, error: 'Неверный email или пароль' };
        }

        if (!data.user) {
            return { isSuccess: false, error: 'Не удалось создать пользователя' };
        }

        return { isSuccess: true, error: null }
    }
    catch (error) {
        let errorMessage = '';
        error instanceof Error ? errorMessage = error.message : errorMessage = String(error);

        return {
            isSuccess: false,
            error: errorMessage,
        }
    }
}

export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const {data} = await supabase.auth.getSession();
        return !!data.session;
    }
    catch (error) {
        console.log("Ошибка сессии: ", error);
        return false;
    }
}

export const logOut = async (): Promise<boolean> => {
    try {
        await supabase.auth.signOut();
        return true;
    }
    catch (error) {
        console.error("Ошибка выхода из системы: ", error);
        return false;
    }
}