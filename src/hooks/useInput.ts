import {useState} from 'react';
import { type ChangeEvent } from 'react';

type useInputReturn = {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

export const useInput = (initialValue: string): useInputReturn => {
    const [value, setValue] = useState<string>(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const reset = () => {
        setValue(initialValue);
    }

    return {
        value,
        onChange,
        reset
    }
}