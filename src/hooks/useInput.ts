import {useState} from 'react';
import { type ChangeEvent } from 'react';

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return {
        value,
        onChange
    }
}