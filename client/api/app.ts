import axios, {AxiosResponse} from 'axios';
import {GameDataWithPlayerNames, LoggedUsers, UserData} from '../../common/interfaces/game_interfaces';

export function createGame(): Promise<AxiosResponse<GameDataWithPlayerNames>> {
    return axios.post('/dashboard/user_games');
}
export function fetchGames(): Promise<AxiosResponse<Array<GameDataWithPlayerNames>>> {
    return axios.get('/dashboard/user_games');
}
export function fetchUserAndVacantGames(): Promise<AxiosResponse<Array<GameDataWithPlayerNames>>> {
    return axios.get('/dashboard/user_vacant_games');
}
export function fetchUserSettings(): Promise<AxiosResponse<UserData>> {
    return axios.get('/user_data');
}
export function fetchActiveUsers(): Promise<AxiosResponse<LoggedUsers>> {
    return axios.get('/dashboard/active_users');
}
