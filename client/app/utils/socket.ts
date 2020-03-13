import * as io from 'socket.io-client';
import {Dispatch} from 'redux';
import {SocketClientConnectedDataType} from '../../common/interfaces/socket_interfaces';
import {SocketEvent} from '../../../common/contants/socket_enums';
import {addUserToActiveUsers, changeGameData, removeUserFromActiveUsers} from '../actions/app_actions';
import {boundMethod} from 'autobind-decorator';
import {SocketGameDataChangedData} from '../../../common/interfaces/socket_event_data_types';
import {AppStore} from '../reducers/app_reducer';
import {GameTableFields} from '../../../server/enums/database';

class SocketManager {
    private socket: SocketIOClient.Socket;
    private getState: () => AppStore;
    private dispatch: Dispatch;

    public constructor() {
        this.socket = io();
    }
    public initialize(dispatch: Dispatch, getState: () => AppStore) {
        this.dispatch = dispatch;
        this.getState = getState;

        this.attachEvents();
    }
    private attachEvents(): void {
        this.socket.on(SocketEvent.UserConnected, this.onUserConnected);
        this.socket.on(SocketEvent.UserDisconnected, this.onUserDisconnected);
        this.socket.on(SocketEvent.GameDataChanged, this.onGameDataChanged);
    }
    @boundMethod
    private onUserConnected(data: SocketClientConnectedDataType): void {
        if (data.id && data.login) {
            this.dispatch(addUserToActiveUsers(data));
        } else {
            console.warn('Unknown user connected');
        }
    }
    @boundMethod
    private onUserDisconnected(data: SocketClientConnectedDataType): void {
        // TODO weird type cast
        if (data.id) {
            this.dispatch(removeUserFromActiveUsers(data.id as unknown as string));
        }
    }
    @boundMethod
    private onGameDataChanged(data: SocketGameDataChangedData): void {
        const {
            id: playerId,
        } = this.getState().userSettings;
        const showNotification = playerId === data.gameData[GameTableFields.PLAYER1_ID];

        this.dispatch(changeGameData(data, showNotification));
    }
    public emitPlayerJoinedToGameEvent(userId: number, gameId: number): void {
        this.socket.emit(SocketEvent.PlayerJoinedToGame, {
            userId,
            gameId,
        });
    }
}

export const socketManager = new SocketManager();
