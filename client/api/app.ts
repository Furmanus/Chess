import axios, {AxiosResponse} from 'axios';
import {GameDataWithPlayerNames} from '../../common/interfaces/game_interfaces';

export function createGame(): Promise<AxiosResponse<GameDataWithPlayerNames>> {
    return axios.post('/dashboard/user_games');
}
export function fetchGames(): Promise<AxiosResponse<Array<GameDataWithPlayerNames>>> {
    return axios.get('/dashboard/user_games');
}
