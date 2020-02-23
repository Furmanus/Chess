import axios from 'axios';

export function sendLoginData(user: string, password: string): Promise<any> {
    return axios.post('/login', {
        user,
        password,
    });
}
export function sendRegisterData(user: string, password: string, repeatedPassword: string): Promise<any> {
    return axios.post('/register', {
        user,
        password,
        repeatedPassword,
    });
}
export function logoutRequest(): Promise<void> {
    return axios.post('/logout');
}