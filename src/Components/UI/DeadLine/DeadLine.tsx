import './DeadLine.css';
import {useRef, useState} from "react";

const DeadLine = () => {
    const [timeState, setTimeState] = useState('');

    const time = useRef<HTMLInputElement | null>(null)

    function handleClick() {
        const timeValue = time?.current?.value;
        const timeArray = timeValue?.split(":").map(Number);
        const now = Date.now()

        if (timeArray && timeArray.length >= 2) {
            const [hours, minutes] = timeArray;
            const ms = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);


            let end = now + ms;

            setInterval(() => {
                deadLine(end)
            }, 1000)

            console.log('Время окончания: ', end)
        }
    }

    function deadLine(end: any) {
        const now = Date.now()

        const deadLine = end - now;

        const hours = Math.floor(deadLine / (1000 * 60 * 60));
        const minutes = Math.floor((deadLine % (1000 * 60 * 60)) / (1000 * 60));
        console.log('asdsaddsa')
        if (minutes === 0) {
            setTimeState('Время вышло')
            return
        }

        setTimeState(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    }

    return (
        <div>
            <div className="card">
                <span className="label">Дедлайн</span>

                <div className="picker-row">
                    <span className="icon">🕐</span>
                    <input type="time" id="timeInput" ref={time}/>
                </div>

                <div className="urgency" id="urgency">
                    <div className="urgency-dot" id="dot"></div>
                    <span id="urgencyText">Выберите время (чч/мм) </span>
                </div>

                <button onClick={handleClick}>Сохранить</button>
            </div>
            <h1 style={{color: "white"}}>Осталось: {timeState}</h1>
        </div>
    );
};

export default DeadLine;