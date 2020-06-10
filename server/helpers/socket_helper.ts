import * as SocketIO from 'socket.io';
import {Socket} from 'socket.io';
import {GameDataChangedReason, SocketEvent} from '../../common/contants/socket_enums';
import {GameMove, LoggedUserData, LoggedUsers, LoggedUsersClient} from '../../common/interfaces/game_interfaces';
import {databaseHelper} from '../utils/database';
import {GameTableFields} from '../enums/database';
import {GameTable} from '../../common/models/game_table';
import {getCoordinatesFromString} from '../../common/utils/utils';

const loggedUsers: LoggedUsers = {};

class SocketHelper {
    private io: SocketIO.Server;

    public initialize(io: SocketIO.Server): void {
        this.io = io;

        this.attachServerEvents();
    }
    public getLoggedUsers(): LoggedUsersClient {
        return Object.keys(loggedUsers).reduce((result: LoggedUsersClient, previous: string) => {
            const userData = loggedUsers[parseInt(previous, 10)];

            if (userData) {
                result[parseInt(previous, 10)] = userData.name;
            }

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
    public emitOnlyToSpecificUsers(targetUsersId: number, event: string, data?: object): void;
    public emitOnlyToSpecificUsers(targetUsersId: number[], event: string, data?: object): void;
    public emitOnlyToSpecificUsers(targetUsersId: number | number[], event: string, data?: object): void {
        if (!Array.isArray(targetUsersId)) {
            targetUsersId = [targetUsersId];
        }

        targetUsersId.forEach((targetUserId: number) => {
            const targetUserSocket = this.getUserById(targetUserId)?.socket;
            const targetUserSocketId = targetUserSocket?.id;

            if (targetUserSocketId) {
                this.io.to(targetUserSocketId).emit(event, data);
            }
        });
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
            } catch (err) {
                //TODO error handling
                console.error(err);
                socket.emit(SocketEvent.FailedToUpdateGameData);
            }
        });
        socket.on(SocketEvent.MoveFigure, async (data: {userId: number; gameId: number, move: GameMove}) => {
            const {
                userId,
                gameId,
                move,
            } = data;
            const fromCoord = getCoordinatesFromString(move.from);
            const toCoord = getCoordinatesFromString(move.to);

            try {
                const game = await databaseHelper.getGameById(gameId);
                const gameTable = new GameTable(game[GameTableFields.GAME_DATA]);
                const movementResult = gameTable.moveFigure(fromCoord, toCoord);
                const isMoveMadeByValidPlayer = game[GameTableFields.ACTIVE_PLAYER] === userId;
                const playerFirstId = game[GameTableFields.PLAYER1_ID];
                const playerSecondId = game[GameTableFields.PLAYER2_ID];
                const newActiveUser = game[GameTableFields.ACTIVE_PLAYER] === playerFirstId ?
                    playerSecondId :
                    playerFirstId;

                if (isMoveMadeByValidPlayer && movementResult) {
                    const updatedGame = await databaseHelper.updateGameWithMove(gameId, {
                        gameTable: gameTable.table,
                        move,
                        newActiveUser,
                    });

                    this.emitOnlyToSpecificUsers(
                        [playerFirstId, playerSecondId],
                        SocketEvent.MoveFigure,
                        {
                            updatedGame,
                            move,
                        },
                    );
                } else {
                    console.error('Move made by illegal player or illegal move has been made');
                }

            } catch (err) {
                // TODO error handling
                console.error(err);
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
