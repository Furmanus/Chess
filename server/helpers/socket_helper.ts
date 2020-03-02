import * as SocketIO from 'socket.io';
import {Socket} from 'socket.io';
import {SocketEvent} from '../../common/contants/socket_enums';
import {LoggedUsers} from '../../common/interfaces/game_interfaces';

const loggedUsers: LoggedUsers = {};

class SocketHelper {
    private io: SocketIO.Server;

    public initialize(io: SocketIO.Server): void {
        this.io = io;

        this.attachServerEvents();
    }
    public getLoggedUsers(): LoggedUsers {
        return loggedUsers;
    }
    private attachServerEvents(): void {
        this.io.on('connection', this.socketServerConnectionHandler.bind(this));
    }
    private attachSocketEvents(socket: Socket): void {
        const {
            user,
            userName,
        } = socket.handshake.session;

        socket.on('disconnect', (reason) => {
            delete loggedUsers[user];

            socket.broadcast.emit(SocketEvent.UserDisconnected, {
                id: user,
                login: userName,
            });
        });
    }
    private socketServerConnectionHandler(socket: Socket): void {
        const {
            user,
            userName,
        } = socket.handshake.session;

        this.attachSocketEvents(socket);

        loggedUsers[user] = userName;

        socket.broadcast.emit(SocketEvent.UserConnected, {
            id: user,
            login: userName,
        });
    }
}

export const sockerHelper = new SocketHelper();
