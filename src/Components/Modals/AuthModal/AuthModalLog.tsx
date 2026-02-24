import Input from "../../UI/Input/Input.tsx";
import classes from './authModal.module.css'
import Button from "../../UI/Button/Button.tsx";
import {useInput} from "../../../hooks/useInput.ts";
import {signIn} from "../../../api/auth.ts";
import GlassNotify from "../Notify/GlassNotify.tsx";
import Loading from "../Loading/Loading.tsx";
import {type Dispatch, type SetStateAction, } from "react";
import {useFormState} from "../../../hooks/useFormState.ts";
import {createPortal} from "react-dom";

interface AuthModalLogProps {
    setAuth: Dispatch<SetStateAction<boolean | null>>;
}

const AuthModalLog = ({setAuth}: AuthModalLogProps) => {
    const email= useInput("");
    const password= useInput("");
    const { loading, setLoading, handleError, handleSuccess, notifyOpen, notifyMessage, notifyType } = useFormState()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setLoading(true);

        try {
            const result = await signIn(email.value, password.value);

            if (!result.isSuccess) {
                handleError(result.error ?? 'Неизвестная ошибка')
                return
            }

            handleSuccess('Успешный вход! ✅')

            setAuth(true);
        }
        catch (error: unknown) {
            handleError(error)
        }
        finally {
            // Для красоты
            setTimeout(() => {
                setLoading(false);
            }, 500)
        }
    }

    return (
        <div>
            <div>
                {loading ? createPortal(<Loading/>, document.body) : null}
                <h1 className={classes['auth-log-title']}>Вход в систему</h1>
                <p className={classes['auth-log-subtitle']}>Войдите для доступа к вашим задачам</p>

                <form className={classes['auth-log-form']} onSubmit={(event) => handleSubmit(event)}>
                    <Input type='text' value={email.value} onChange={email.onChange} label="email" placeholder="your@email.com"/>
                    <Input type='password' value={password.value} onChange={password.onChange} label="пароль" placeholder="Введите пароль"/>

                    <section className={classes['auth-btn-form']}>
                        <Button variant="secondary" type="button">Отмена</Button>
                        <Button variant="primary" type="submit">Войти</Button>
                    </section>
                </form>
            </div>

            {notifyOpen && createPortal(
                <GlassNotify open={notifyOpen} message={notifyMessage} type={notifyType}/>,
                document.body
            )}
        </div>
    );
};

export default AuthModalLog;