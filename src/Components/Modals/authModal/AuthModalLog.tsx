import Input from "../../UI/Input.tsx";
import classes from './authModal.module.css'
import Button from "../../UI/Button.tsx";
import './authModal.module.css';
import {useInput} from "../../../hooks/useInput.tsx";
import type {useInputProps} from "../../../types";

const AuthModalLog = () => {
    const email: useInputProps = useInput("");
    const password: useInputProps = useInput("");

    return (
        <div>
            <h1 className={classes['auth-log-title']}>Вход в систему</h1>
            <p className={classes['auth-log-subtitle']}>Войдите для доступа к вашим задачам</p>

            <form className={classes['auth-log-form']}>
                <Input value={email.value} onChange={email.onChange} label="email" placeholder="your@email.com"/>
                <Input value={password.value} onChange={password.onChange} label="пароль" placeholder="Введите пароль"/>

                <section className={classes['auth-btn-form']}>
                    <Button type="secondary">Отмена</Button>
                    <Button type="primary">Войти</Button>
                </section>
            </form>
        </div>
    );
};

export default AuthModalLog;