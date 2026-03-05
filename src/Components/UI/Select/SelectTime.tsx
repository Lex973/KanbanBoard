import classes from "./Select.module.css";
import type {Priority} from "../../../types";
import {useState, useRef, useEffect} from "react";

interface SelectProps {
    value: Priority;
}

const options = [
    { value: 'none', label: 'Без сортировки',color: '#6e7782' },
    { value: 'timeUp', label: 'По времени ↑', color: '#FF6B6B' },
    { value: 'timeDown', label: 'По времени ↓', color: '#FFB84D' },
];

const Select = ({value}: SelectProps) => {
    const [openTime, setOpenTime] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = options.find(o => o.value === value) ?? options[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpenTime(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleSelect() {
        setOpenTime(false);
    }
    return (
        <div className={classes.wrapper} ref={ref}>
            <button
                className={`${classes.trigger} ${openTime ? classes.triggerOpen : ''}`}
                onClick={() => setOpenTime(prev => !prev)}
                type="button"
            >
                <span className={classes.dot} style={{background: current.color}}/>
                <span className={classes.label}>{current.label}</span>
                <svg
                    className={`${classes.arrow} ${openTime ? classes.arrowOpen : ''}`}
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            {openTime && (
                <div className={classes.dropdown}>
                    {options.map(opt => (
                        <button
                            key={opt.value}
                            type="button"
                            className={`${classes.option} ${opt.value === value ? classes.optionActive : ''}`}
                            onClick={() => handleSelect()}
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