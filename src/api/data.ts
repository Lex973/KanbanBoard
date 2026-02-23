import {supabase} from "../supabase-client.ts";
import type {CustomAuthResponseUserInfo} from "../types";

export async function getUserData(): Promise<CustomAuthResponseUserInfo> {
    try {
        const {data, error} = await supabase.auth.getUser()
        const user = data.user;

        if (error || !user) {
            return {
                user: null,
                email: null,
                name: null,
                error: error?.message ?? 'Нет пользователя',
            }
        }

        const { data: profile } = await supabase.from('profiles').select('name').eq('id', user?.id).single();

        return {
            user: user,
            email: user?.email ?? null,
            name: profile?.name ?? null,
            error: null
        }

    } catch (error: unknown) {
        let errorMessage = 'Error';

        error instanceof Error ? errorMessage = error.message : String(error);

        return {
            user: null,
            email: null,
            name: null,
            error: errorMessage
        }
    }
}
