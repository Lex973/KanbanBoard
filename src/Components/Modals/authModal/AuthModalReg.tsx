import Input from "../../UI/Input.tsx";
import classes from './authModal.module.css'
import Button from "../../UI/Button.tsx";
import {useInput} from "../../../hooks/useInput.tsx";
import type {useInputProps} from "../../../types";

const AuthModalLog = () => {
    const name: useInputProps = useInput("");
    const email: useInputProps = useInput("");
    const password: useInputProps = useInput("");

    return (
        <div>
            <h1 className={classes['auth-log-title']}>Регистрация</h1>
            <p className={classes['auth-log-subtitle']}>Создайте аккаунт для начала работы</p>

            <form className={classes['auth-log-form']}>
                <Input value={name.value} onChange={name.onChange} label="имя" placeholder="Ваше имя"/>
                <Input value={email.value} onChange={email.onChange} label="email" placeholder="your@email.com"/>
                <Input value={password.value} onChange={password.onChange} label="пароль" placeholder="Минимум 8 символов"/>

                <section className={classes['auth-btn-form']}>
                    <Button type="secondary">Отмена</Button>
                    <Button type="primary">Войти</Button>
                </section>
            </form>
        </div>
    );
};

export default AuthModalLog;