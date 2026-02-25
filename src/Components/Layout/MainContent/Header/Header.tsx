import classes from "./Header.module.css";
import Select from "../../../UI/Select/Select.tsx";
import type {Dispatch, SetStateAction} from "react";
import {motion} from "framer-motion";
import type {Priority} from "../../../../types";
import Search from "../../../UI/Search/Search.tsx";
import SelectTime from "../../../UI/Select/SelectTime.tsx";

interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>,
    onFilter: (filter: Priority) => void,
    onSearch: Dispatch<SetStateAction<string>>,
    value: Priority,
}

const Header = ({setOpen, onFilter, onSearch, value}: Props) => {
    return (
        <header className={classes.header}>
            <motion.div initial={{opacity: 0, translateY: -100}} animate={{opacity: 1, translateY: 0}}
                        transition={{duration: 1.5, type: 'spring'}}>
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

            <motion.div initial={{opacity: 0, translateY: -100}} animate={{opacity: 1, translateY: 0}}
                        transition={{duration: 1, type: 'spring'}}>
                <div className={classes.toolBar}>
                    <Search onSearch={onSearch}/>

                    <Select onFilter={onFilter} value={value} />

                    <SelectTime value={value}/>

                </div>
            </motion.div>
        </header>
    );
};

export default Header;