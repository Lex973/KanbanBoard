import classes from './Button.module.css';
import React from "react";

type ButtonVariant = 'secondary' | 'primary';

interface ButtonProps {
    children?: React.ReactNode;
    variant: ButtonVariant;
}

const Button = ({children, variant}: ButtonProps) => {

    const variantStyles = {
        primary: classes.btnPrimary,
        secondary: classes.btnSecondary,
    }

    const variantClass: string = variantStyles[variant];

    return (
        <button className={`${classes.btn} ${variantClass}`}>
            {children}
        </button>
    );
};

export default Button;
