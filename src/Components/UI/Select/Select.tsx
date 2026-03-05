import classes from "./Select.module.css";
import type {Priority} from "../../../types";
import {useState, useRef, useEffect} from "react";

interface SelectProps {
    onFilter: (filter: Priority) => void;
    value: Priority;
}

const options = [
    { value: 'all', label: 'Все приоритеты',color: '#6e7782' },
    { value: 'high', label: 'Высокий', color: '#FF6B6B' },
    { value: 'medium', label: 'Средний', color: '#FFB84D' },
    { value: 'low', label: 'Низкий', color: '#7CFF6B' },
];

const Select = ({onFilter, value}: SelectProps) => {
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const current = options.find(o => o.value === value) ?? options[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleSelect(val: string) {
        onFilter(val as Priority);
        setOpen(false);
    }

    return (
        <div className={classes.wrapper} ref={ref}>
            <button
                className={`${classes.trigger} ${open ? classes.triggerOpen : ''}`}
                onClick={() => setOpen(prev => !prev)}
                type="button"
            >
                <span className={classes.dot} style={{background: current.color}}/>
                <span className={classes.label}>{current.label}</span>
                <svg
                    className={`${classes.arrow} ${open ? classes.arrowOpen : ''}`}
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            {open && (
                <div className={classes.dropdown}>
                    {options.map(opt => (
                        <button
                            key={opt.value}
                            type="button"
                            className={`${classes.option} ${opt.value === value ? classes.optionActive : ''}`}
                            onClick={() => handleSelect(opt.value)}
                        >
                            <span className={classes.dot} style={{background: opt.color}}/>
                            <span>{opt.label}</span>
                            {opt.value === value && (
                                <svg className={classes.check} width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;