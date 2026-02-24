import classes from "./Select.module.css";

const Select = () => {
    return (
        <div className={classes.control}>
            <span className={classes.searchIcon}>⚡</span>

            <select className={classes.select}>
                <option value="">Все приоритеты</option>
                <option value="">HIGH</option>
                <option value="">MEDIUM</option>
                <option value="">LOW</option>
            </select>
        </div>
    );
};

export default Select;