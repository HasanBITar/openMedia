export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);
    if (!isValid) return [false, 'Invalid Email Address']
    return [true, 'Valid Email'];
}

export function validatePassword(password) {
    if (password.length < 8) return [false, 'it should be longer than 8 characters'];
    return [true, ''];
}

export function validateText(text) {
    if(text.trim().length === 0){
        return [false, 'Field cannot be empty'];
    }
    return [true, 'Valid input'];
}