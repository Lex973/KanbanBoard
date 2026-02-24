import classes from "./Header.module.css";
import Select from "../../../UI/Select/Select.tsx";
import type {Dispatch, SetStateAction} from "react";
import {motion} from "framer-motion";

interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const Header = ({setOpen}: Props) => {
    return (
        <header className={classes.header}>
            <motion.div initial={{opacity: 0, translateY: -100}} animate={{opacity: 1, translateY: 0}} transition={{duration: 1.5, type: 'spring'}}>
                <div className={classes.headerTop}>
                    <div className="headerLeft">
                        <h1 className={classes.headerLeftHeading}>Доска задач</h1>
                        <p className={classes.headerLeftLabel}>Ваш личный центр управления проектами</p>
                    </div>

                    <div className="headerRight">
                        <button className={classes.headerBtn} onClick={() => setOpen(true)}>
                            <span className={classes.plus}>+</span>
                            Создать задачу
                        </button>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{opacity: 0, translateY: -100}} animate={{opacity: 1, translateY: 0}} transition={{duration: 1, type: 'spring'}}>
            <div className={classes.toolBar}>
                <div className={classes.control}>
                    <span className={classes.searchIcon}>🔍</span>

                    <input type="text" className={classes.input} placeholder="Поиск задач"/>
                </div>

                <Select/>

                <div className={classes.control}>
                    <span className={classes.searchIcon}>⇅</span>

                    <select className={classes.select}>
                        <option value="">Без сортировки</option>
                        <option value="">По названию</option>
                        <option value="">По приоритету</option>
                    </select>
                </div>
            </div>
            </motion.div>
        </header>
    );
};

export default Header;