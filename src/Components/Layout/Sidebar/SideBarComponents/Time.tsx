import classes from './SidebarComponents.module.css';
import {useEffect, useState} from "react";

const Time = () => {
    const [time, setTime] = useState(new Date());

    const newDate = new Date();
    const currentDate = newDate.getDate()
    const currentMonth = newDate.getMonth()

    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const formattedHours = `${hours}`;
    const formattedMinutes = `${minutes}`;

    useEffect(() => {
        const dateInterval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(dateInterval)
    }, []);

    return (
        <div className={classes.timeWidget}>
            <div className={classes.currentTime}>
                {formattedHours}
                <div className={classes.dateColon}>:</div>
                {formattedMinutes}
            </div>

            <div className={classes.currentDate}>{currentDate} {months[currentMonth]}</div>
        </div>
    );
};

export default Time;