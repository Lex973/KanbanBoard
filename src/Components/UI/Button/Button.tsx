import classes from './Button.module.css';
import React from "react";

type ButtonVariant = 'secondary' | 'primary';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
    children?: React.ReactNode;
    variant: ButtonVariant;
    type: ButtonType;
}

const Button = ({children, variant, type}: ButtonProps) => {
    const variantStyles = {
        primary: classes.btnPrimary,
        secondary: classes.btnSecondary,
    }

    const variantClass: string = variantStyles[variant];

    return (
        <button className={`${classes.btn} ${variantClass}`} type={type}>
            {children}
        </button>
    );
};

export default Button;
