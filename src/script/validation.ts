export const validateEmail = (email: string) => {
    if (!email.includes('@') || !email.includes('.')) {
        return {isValid: false, error: 'Отсутствуют обязательные знаки в email (@.)'}
    }

    return {isValid: true}
}
export const validatePassword = (password: string) => {
    const value = password.trim()

    if (value.length < 8) {
        return {isValid: false, error: 'Длина пароля должна быть больше 8 символов'}
    }

    if (!/[A-Za-z]/.test(value)) {
        return {isValid: false, error: 'Пароль должен содержать хотя бы одну букву'}
    }

    if (!/\d/.test(value)) {
        return {isValid: false, error: 'Пароль должен содержать хотя бы одну цифру'}
    }

    return {isValid: true}
}