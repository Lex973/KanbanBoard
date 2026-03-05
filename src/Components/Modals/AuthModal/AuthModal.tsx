import classes from './authModal.module.css'
import AuthModalLog from "./AuthModalLog.tsx";
import {type Dispatch, type SetStateAction, useState} from "react";
import AuthModalReg from "./AuthModalReg.tsx";

interface AuthModalProps {
    setAuth: Dispatch<SetStateAction<boolean | null>>;
}

const AuthModal = ({setAuth}: AuthModalProps) => {
    const [mode, setMode] = useState<'log' | 'reg'>('log');

    return (
        <div className={classes['modal-auth-overlay']}>
           <div className={classes.modalAuth}>
                <div className={classes.authTabs}>
                    <button
                        className={mode === 'log' ? `${classes.authBtn} ${classes.active}` : `${classes.authBtn}`}
                        onClick={() => setMode('log')}
                    >
                        Вход
                    </button>

                    <button
                        className={mode === 'reg' ? `${classes.authBtn} ${classes.active}` : `${classes.authBtn}`}
                        onClick={() => setMode('reg')}
                    >
                        Регистрация
                    </button>
                </div>

               <section>
                   {mode === 'reg' ? <AuthModalReg/> : <AuthModalLog setAuth={setAuth}/>}
               </section>
           </div>
        </div>
    );
};

export default AuthModal;