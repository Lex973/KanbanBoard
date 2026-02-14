import classes from './authModal.module.css'
import AuthModalLog from "./AuthModalLog.tsx";
import {useState} from "react";
import AuthModalReg from "./AuthModalReg.tsx";

const AuthModal = () => {
    const [mode, setMode] = useState<'log' | 'reg'>('log');

    function resetMode(type: string) {
        type === 'reg' ? setMode('reg') : setMode('log')
    }

    return (
        <div className={classes['modal-auth-overlay']}>
           <div className={classes.modalAuth}>
                <div className={classes.authTabs}>
                    <button
                        className={mode === 'log' ? `${classes.authBtn} ${classes.active}` : `${classes.authBtn}`}
                        onClick={() => resetMode('log')}
                    >
                        Вход
                    </button>

                    <button
                        className={mode === 'reg' ? `${classes.authBtn} ${classes.active}` : `${classes.authBtn}`}
                        onClick={() => resetMode('reg')}
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