import classes from "./SidebarComponents.module.css";

const Navigation = () => {
    return (
        <div>
            <ul className={classes.navSection}>
                <li className={`${classes.navItem} ${classes.active}`}>Доска задач</li>
                <li className={classes.navItem}>Календарь</li>
                <li className={classes.navItem}>Проекты</li>
                <li className={classes.navItem}>Аналитика</li>
                <li className={classes.navItem}>Настройки</li>
            </ul>
        </div>
    );
};

export default Navigation;