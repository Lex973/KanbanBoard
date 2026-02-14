import classes from "./Input.module.css";
import type {ChangeEvent} from "react";

interface props {
    label: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({label, placeholder, onChange}: props) => {
    return (
        <div>
            <label className={classes.label}>{label}</label>
            <input onChange={onChange} type="text" placeholder={placeholder} className={classes.input} />
        </div>
    );
};

export default Input;