import {supabase} from "../supabase-client.ts";

export interface CustomAuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
        createdAt: string;
    } | null;

    error: string | null;
}

interface CustomAuthResponseSignIn {
    isSuccess: boolean;
    error: string | null;
}


export const signUp = async (email: string, password: string, name: string): Promise<CustomAuthResponse> => {
    try {
        const {data, error} = await supabase.auth.signUp({email, password});

        console.log('🔵 Ответ Supabase:', { data, error });

        if (error) {
            console.log(error)
            return {user: null, error: "Ошибка регистрации"};
        }

        if (!data.user) {
            return {user: null, error: 'Не удалось создать пользователя'};
        }

        const user = {
            id: data.user.id,
            email: data.user.email ?? '',
            name: name,
            createdAt: data.user.created_at
        }

        return { user, error: null }
    }
    catch (error: any) {
        console.log("Sign Up Error: ", error);
        return {
            user: null,
            error: error,
        }
    }
}

export const signIn = async (email: string, password: string): Promise<CustomAuthResponseSignIn> => {
    try {
        const {data, error} = await supabase.auth.signInWithPassword({email, password});

        if (error) {
            return { isSuccess: false, error: 'Пароль неверный' };
        }

        if (!data.user) {
            return { isSuccess: false, error: 'Не удалось создать пользователя' };
        }

        return { isSuccess: true, error: null }
    }
    catch (error: any) {
        console.log("Ошибка входа: ", error);

        return {
            isSuccess: false,
            error: error,
        }
    }
}

export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const {data} = await supabase.auth.getSession();
        console.log(data)
        return !!data.session;
    }
    catch (error) {
        console.log("Ошибка сессии: ", error);
        return false;
    }
}

export const isLogOut = async (): Promise<boolean> => {
    try {
        await supabase.auth.signOut();
        return true;
    }
    catch (error) {
        console.error("Ошибка выхода из системы: ", error);
        return false;
    }
}