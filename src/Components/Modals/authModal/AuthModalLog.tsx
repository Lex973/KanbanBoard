
import Input from "../../UI/Input.tsx";
import classes from './authModal.module.css'
import Button from "../../UI/Button.tsx";
import {useInput} from "../../../hooks/useInput.ts";
import type {UseInputReturn } from "../../../types";

const AuthModalLog = () => {
    const email: UseInputReturn  = useInput("");
    const password: UseInputReturn  = useInput("");

    function handleSubmit(event: any) {
        event.preventDefault()
    }       

    return (
        <div>
            <h1 className={classes['auth-log-title']}>Вход в систему</h1>
            <p className={classes['auth-log-subtitle']}>Войдите для доступа к вашим задачам</p>

            <form className={classes['auth-log-form']} onSubmit={(event) => handleSubmit(event)}>
                <Input type='text' value={email.value} onChange={email.onChange} label="email" placeholder="your@email.com"/>
                <Input type='password' value={password.value} onChange={password.onChange} label="пароль" placeholder="Введите пароль"/>

                <section className={classes['auth-btn-form']}>
                    <Button variant="secondary">Отмена</Button>
                    <Button variant="primary">Войти</Button>
                </section>
            </form>
        </div>
    );
};

    export default AuthModalLog;