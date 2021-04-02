export const userLogin = (token) => localStorage.setItem('userToken', token);
export const userLogout = () => localStorage.removeItem('userToken');
export const getToken = () => localStorage.getItem('userToken');
export const isAuthenticated = () => localStorage.getItem('userToken') !== null;
