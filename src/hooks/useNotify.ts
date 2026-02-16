import {useState} from "react";

export const useNotify = () => {
    const [notifyOpen, setNotifyOpen] = useState(false)
    const [notifyMessage, setNotifyMessage] = useState('')
    const [notifyType, setNotifyType] = useState<'success' | 'error'>('success')

    const showModal = (text: string, type: 'success' | 'error') => {
        setNotifyOpen(false);

        setTimeout(() => {
            setNotifyMessage(text);
            setNotifyType(type);
            setNotifyOpen(true);
        }, 10)
    };

    return {
        notifyOpen,
        notifyMessage,
        notifyType,
        showModal,
    };
}