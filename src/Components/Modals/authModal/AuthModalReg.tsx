import Input from "../../UI/Input.tsx";
import classes from './authModal.module.css'
import Button from "../../UI/Button.tsx";
import {useInput} from "../../../hooks/useInput.ts";
import GlassNotify from "../Notify/GlassNotify.tsx";
import {validateEmail, validatePassword} from "../../../script/validation.ts";
import {type CustomAuthResponse, signUp} from "../../../api/auth.ts";
import {useNotify} from "../../../hooks/useNotify.ts";

const AuthModalReg = () => {
    const name = useInput("");
    const email = useInput("");
    const password = useInput("");

    const { notifyOpen, notifyMessage, notifyType, showModal } = useNotify();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const emailValidateResult = validateEmail(email.value);
        if (!emailValidateResult.isValid) {
            showModal(emailValidateResult.error!, 'error');
            return;
        }

        const passwordValidateResult = validatePassword(password.value);
        if (!passwordValidateResult.isValid) {
            showModal(passwordValidateResult.error!, 'error');
            return;
        }

        try {
            const result: CustomAuthResponse = await signUp(email.value, password.value, name.value)
            console.log('📦 Результат signUp:', result);

            if (result.error) {
                showModal(result.error, 'error');
            } else {
                showModal('Регистрация успешна. Проверьте почту ✅', 'success');

                setTimeout(() => {
                    name.reset()
                    email.reset()
                    password.reset()
                }, 500);
            }
        } catch (error: any) {
            console.log("Критическая ошибка");
            showModal(error, 'error');
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
                    <Button variant="secondary" type="button">Отмена</Button>
                    <Button variant="primary" type="submit">Регистрация</Button>
                </section>
            </form>

            {notifyOpen && <GlassNotify open={notifyOpen} message={notifyMessage} type={notifyType}/>}
        </div>
    );
};

export default AuthModalReg;