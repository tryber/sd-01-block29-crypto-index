export const saveLocalStorage = (token) => localStorage.setItem('token', token);

export const getLocalStorage = () => localStorage.getItem('token');
