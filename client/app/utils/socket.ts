import * as io from 'socket.io-client';
import {Dispatch} from 'redux';
import {SocketClientConnectedDataType} from '../../common/interfaces/socket_interfaces';
import {SocketEvent} from '../../../common/contants/socket_enums';
import {addUserToActiveUsers, removeUserFromActiveUsers} from '../actions/app_actions';
import {boundMethod} from 'autobind-decorator';

class SocketManager {
    private socket: SocketIOClient.Socket;
    private dispatch: Dispatch;

    public constructor() {
        this.socket = io();
    }
    public initialize(dispatch: Dispatch) {
        this.dispatch = dispatch;

        this.attachEvents();
    }
    private attachEvents(): void {
        this.socket.on(SocketEvent.UserConnected, this.onUserConnected);
        this.socket.on(SocketEvent.UserDisconnected, this.onUserDisconnected);
    }
    @boundMethod
    private onUserConnected(data: SocketClientConnectedDataType): void {
        this.dispatch(addUserToActiveUsers(data));
    }
    @boundMethod
    private onUserDisconnected(data: SocketClientConnectedDataType): void {
        // TODO weird type cast
        this.dispatch(removeUserFromActiveUsers(data.id as unknown as string));
    }
}

export const socketManager = new SocketManager();
