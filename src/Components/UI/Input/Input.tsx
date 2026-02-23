import classes from "./Input.module.css";
import type {ChangeEvent} from "react";

interface InputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'password';
}

const Input = ({label, placeholder, value, type, onChange}: InputProps) => {
    return (
        <div>
            <label
                htmlFor={label}
                className={classes.label}
            >{label}
            </label>

            <input
                id={label}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className={classes.input}
                required={true}
            />
        </div>
    );
};

export default Input;