import Input from "../../UI/Input/Input.tsx";
import classes from './authModal.module.css'
import Button from "../../UI/Button/Button.tsx";
import {useInput} from "../../../hooks/useInput.ts";
import GlassNotify from "../Notify/GlassNotify.tsx";
import {validateEmail, validatePassword} from "../../../script/validation.ts";
import {type CustomAuthResponse, signUp} from "../../../api/auth.ts";
import Loading from "../Loading/Loading.tsx";
import {useFormState} from "../../../hooks/useFormState.ts";

const AuthModalReg = () => {
    const name = useInput("");
    const email = useInput("");
    const password = useInput("");

    const { loading, setLoading, handleError, handleSuccess, notifyOpen, notifyMessage, notifyType } = useFormState()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true);

        const emailValidateResult = validateEmail(email.value);
        if (!emailValidateResult.isValid) {
            handleError(emailValidateResult.error ?? 'Ошибка валидации email')
            return
        }

        const passwordValidateResult = validatePassword(password.value);
        if (!passwordValidateResult.isValid) {
            handleError(passwordValidateResult.error ?? 'Ошибка валидации password')
            return;
        }

        try {
            const result: CustomAuthResponse = await signUp(email.value, password.value, name.value)

            if (result.error) {
                handleError(result.error)
            } else {
                handleSuccess('Регистрация успешна. Проверьте почту ✅')
                setTimeout(() => {
                    name.reset()
                    email.reset()
                    password.reset()
                }, 500);
            }
        } catch (error: unknown) {
            handleError(error)
        }
    }

    return (
        <div>
            {loading ? <Loading/> : null}
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