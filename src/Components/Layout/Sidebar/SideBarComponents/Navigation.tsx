import classes from "./SidebarComponents.module.css";

const Navigation = () => {
    return (
        <div className={classes.navSection}>
            <p className={classes.navTitle}>Навигация</p>

            <ul>
                <li className={`${classes.navItem} ${classes.active}`}>📊 Доска задач</li>
                <li className={classes.navItem}>📅 Календарь</li>
                <li className={classes.navItem}>📁 Проекты</li>
                <li className={classes.navItem}>📈 Аналитика</li>
                <li className={classes.navItem}>⚙️ Настройки</li>
            </ul>
        </div>
    );
};

export default Navigation;