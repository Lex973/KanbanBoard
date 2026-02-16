import Input from "../../UI/Input.tsx";
import classes from './authModal.module.css'
import Button from "../../UI/Button.tsx";
import {useInput} from "../../../hooks/useInput.ts";
import {signIn} from "../../../api/auth.ts";
import {useNotify} from "../../../hooks/useNotify.ts";
import GlassNotify from "../Notify/GlassNotify.tsx";

const AuthModalLog = () => {
    const email= useInput("");
    const password= useInput("");

    const { notifyOpen, notifyMessage, notifyType, showModal } = useNotify();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const result = await signIn(email.value, password.value);
            console.log('📦 Результат signIn:', result);

            if (!result.isSuccess) {
                showModal(result.error ?? 'Неизвестная ошибка', 'error')
                return
            }

            showModal('Успешный вход! ✅', 'success');
        }
        catch (error: any) {
            showModal(error, 'error');
        }
    }

    return (
        <div>
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

            {notifyOpen && <GlassNotify open={notifyOpen} message={notifyMessage} type={notifyType}/>}
        </div>
    );
};

export default AuthModalLog;