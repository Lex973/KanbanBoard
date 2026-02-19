import classes from './authModal.module.css'
import AuthModalLog from "./AuthModalLog.tsx";
import {useState} from "react";
import AuthModalReg from "./AuthModalReg.tsx";

const AuthModal = () => {
    type AuthMode = 'log' | 'reg';
    const [mode, setMode] = useState<'log' | 'reg'>('log');

    function switchMode(type: AuthMode) {
        setMode(type);
    }

    return (
        <div className={classes['modal-auth-overlay']}>
           <div className={classes.modalAuth}>
                <div className={classes.authTabs}>
                    <button
                        className={mode === 'log' ? `${classes.authBtn} ${classes.active}` : `${classes.authBtn}`}
                        onClick={() => switchMode('log')}
                    >
                        Вход
                    </button>

                    <button
                        className={mode === 'reg' ? `${classes.authBtn} ${classes.active}` : `${classes.authBtn}`}
                        onClick={() => switchMode('reg')}
                    >
                        Регистрация
                    </button>
                </div>

               <section>
                   {mode === 'reg' ? <AuthModalReg/> : <AuthModalLog/>}
               </section>
           </div>
        </div>
    );
};

export default AuthModal;