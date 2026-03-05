import {useState} from "react";
import {useNotify} from "./useNotify.ts";

export const useFormState = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {showModal, notifyOpen, notifyMessage, notifyType} = useNotify();


    function handleError(error: unknown) {
        setLoading(false);

        const message = error instanceof Error ? error.message : String(error);
        showModal(message, 'error')
    }

    function handleSuccess(message: string) {
        setLoading(false);

        showModal(message, 'success');
    }

    return {loading, setLoading, handleError, handleSuccess, notifyOpen, notifyMessage, notifyType};
}