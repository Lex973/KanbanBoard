import classes from './Search.module.css';
import React, {type ChangeEvent, type SetStateAction} from "react";

interface SearchProps {
    onSearch: React.Dispatch<SetStateAction<string>>
}

const Search = ({onSearch}: SearchProps) => {
    return (
        <div className={classes.control}>
            <span className={classes.searchIcon}>🔍</span>

            <input type="text" className={classes.input} placeholder="Поиск задач" onChange={(event: ChangeEvent<HTMLInputElement>) => onSearch(event.target.value)}/>
        </div>
    );
};

export default Search;