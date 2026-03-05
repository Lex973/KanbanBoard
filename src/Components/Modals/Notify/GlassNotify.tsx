import classes from './GlassNotify.module.css'
import { useEffect, useState } from "react";

interface GlassNotifyProps {
    open: boolean;
    title?: string;
    message: string;
    type: 'success' | 'error';
    duration?: number;
}

const GlassNotify = ({open, title, message, type, duration = 3000}: GlassNotifyProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (open) {
            setShouldRender(true);

            const showTimer = setTimeout(() => {
                setIsVisible(true);
            }, 10);

            return () => clearTimeout(showTimer);
        }
    }, [open]);

    useEffect(() => {
        if (open && shouldRender) {
            const autoCloseTimer = setTimeout(() => {
                setIsVisible(false);

                setShouldRender(false);
            }, duration);

            return () => clearTimeout(autoCloseTimer);
        }
    }, [open, shouldRender, duration]);

    if (!shouldRender) return null;

    const isError = type === 'error';

    return (
        <div className={`${classes.wrapper} ${isVisible ? classes.enter : classes.leave}`}>
            <div className={`${classes.card} ${isError ? classes.error : ''}`}>
                <div className={classes.glow} />

                <div className={classes.content}>
                    {title && <strong className={classes.title}>{title}</strong>}
                    <p className={classes.text}>{message}</p>
                </div>
            </div>
        </div>
    );
}

export default GlassNotify;