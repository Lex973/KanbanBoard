import Input from "../../UI/Input.tsx";
import classes from './authModal.module.css'
import Button from "../../UI/Button.tsx";
import {useInput} from "../../../hooks/useInput.ts";
import type {UseInputReturn} from "../../../types";

const AuthModalReg = () => {
    const name: UseInputReturn = useInput("");
    const email: UseInputReturn = useInput("");
    const password: UseInputReturn = useInput("");

    function validateEmail(email: string): boolean {
        if (!email.includes('@') || !email.includes('.')) {
            console.log("Отсутствуют обязательные знаки (@.)")
            return false
        }
        return true
    }

    function validatePassword(password: string): boolean {
        const value = password.trim()

        if (value.length < 8) {
            console.log('Минимум 8 символов')
            return false;
        }

        if (!/[A-Za-z]/.test(value)) {
            console.log('Добавьте хотя бы одну букву')
            return false;
        }

        if (!/\d/.test(value)) {
            console.log('Добавьте хотя бы одну цифру')
            return false;
        }

        return true;
    }

    function handleSubmit(event: any) {
        event.preventDefault()

        if (validateEmail(email.value) && validatePassword(password.value)) {
            console.log("Все хорошо")
        }
    }


    return (
        <div>
            <h1 className={classes['auth-log-title']}>Регистрация</h1>
            <p className={classes['auth-log-subtitle']}>Создайте аккаунт для начала работы</p>

            <form className={classes['auth-log-form']} onSubmit={handleSubmit}>
                <Input type='text' value={name.value} onChange={name.onChange} label="имя" placeholder="Ваше имя"/>
                <Input type='text' value={email.value} onChange={email.onChange} label="email" placeholder="your@email.com"/>
                <Input type='password' value={password.value} onChange={password.onChange} label="пароль" placeholder="Минимум 8 символов"/>

                <section className={classes['auth-btn-form']}>
                    <Button variant="secondary">Отмена</Button>
                    <Button variant="primary">Войти</Button>
                </section>
            </form>
        </div>
    );
};

export default AuthModalReg;