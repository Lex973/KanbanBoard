import classes from './Button.module.css';
import React from "react";

interface buttonProps {
    children?: React.ReactNode;
    ButtonStyleVariant: 'secondary' | 'primary';
}

const Button = ({children, ButtonStyleVariant}: buttonProps) => {

    function setStyles(styles: string) {
        switch (styles) {
            case 'primary':
                return classes.btnPrimary;
            case 'secondary':
                return classes.btnSecondary ;

                default:
                    return '';
        }
    }

    return (
        <button className={`${classes.btn} ${setStyles(ButtonStyleVariant)}`}>
            {children}
        </button>
    );
};

export default Button;