import * as SocketIO from 'socket.io';
import {Socket} from 'socket.io';
import {GameDataChangedReason, SocketEvent} from '../../common/contants/socket_enums';
import {LoggedUserData, LoggedUsers, LoggedUsersClient} from '../../common/interfaces/game_interfaces';
import {databaseHelper} from '../utils/database';
import {GameTableFields} from '../enums/database';

const loggedUsers: LoggedUsers = {};

class SocketHelper {
    private io: SocketIO.Server;

    public initialize(io: SocketIO.Server): void {
        this.io = io;

        this.attachServerEvents();
    }
    public getLoggedUsers(): LoggedUsersClient {
        return Object.keys(loggedUsers).reduce((result: LoggedUsersClient, previous: string) => {
            result[parseInt(previous, 10)] = loggedUsers[parseInt(previous, 10)].name;

            return result;
        }, {});
    }
    public getUserById(id: number): LoggedUserData {
        return loggedUsers[id];
    }
    public emitEventByUser(userId: number, event: string, data?: object): void {
        const userSocket = this.getUserById(userId)?.socket;

        if (userSocket) {
            userSocket.emit(event, data);
        }
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
        socket.on(SocketEvent.PlayerJoinedToGame, async (data: {userId: number; gameId: number}) => {
            try {
                const updatedGame = await databaseHelper.joinUserToGame(data.userId, data.gameId);

                if (updatedGame) {
                    socket.broadcast.emit(SocketEvent.GameDataChanged, {
                        id: updatedGame[GameTableFields.ID],
                        reason: GameDataChangedReason.PlayerJoined,
                        gameData: updatedGame,
                    });
                } else {
                    // TODO error handling
                    socket.emit(SocketEvent.FailedToUpdateGameData);
                }
            } catch(err) {
                //TODO error handling
                console.error(err);
                socket.emit(SocketEvent.FailedToUpdateGameData);
            }
        });
    }
    private socketServerConnectionHandler(socket: Socket): void {
        const {
            user,
            userName,
        } = socket.handshake.session;

        this.attachSocketEvents(socket);

        loggedUsers[user] = {
            name: userName,
            socket,
        };

        socket.broadcast.emit(SocketEvent.UserConnected, {
            id: user,
            login: userName,
        });
    }
}

export const sockerHelper = new SocketHelper();
