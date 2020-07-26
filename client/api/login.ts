import axios from 'axios';

interface ILoginData {
    backUrl?: string;
}

export function sendLoginData(user: string, password: string): Promise<ILoginData> {
    return axios.post('/login', {
        user,
        password,
    });
}
export function sendRegisterData(user: string, password: string, repeatedPassword: string): Promise<ILoginData> {
    return axios.post('/register', {
        user,
        password,
        repeatedPassword,
    });
}
export function logoutRequest(): Promise<void> {
    return axios.post('/logout');
}
