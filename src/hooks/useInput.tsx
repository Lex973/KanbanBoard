import React, {useState} from 'react';

export const useInput = (InitialValue: string) => {
    const [value, setValue] = useState(InitialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        console.log(value)
    }

    return {
        value,
        onChange
    }
}