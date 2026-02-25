interface validateProps {
    isValid: boolean;
    error?: string
}
export const validateEmail = (email: string): validateProps => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Некорректный email' };
    }
    return { isValid: true };
}

export const validatePassword = (password: string): validateProps => {
    const value = password.trim();

    if (value.length < 8) {
        return { isValid: false, error: 'Длина пароля должна быть больше 8 символов' };
    }
    if (!/[A-Za-z]/.test(value)) {
        return { isValid: false, error: 'Пароль должен содержать хотя бы одну букву' };
    }
    if (!/\d/.test(value)) {
        return { isValid: false, error: 'Пароль должен содержать хотя бы одну цифру' };
    }

    return { isValid: true };
}
