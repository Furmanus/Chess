import * as React from 'react';
import {SyntheticEvent} from 'react';
import {Coordinates, GameDataWithPlayerNames, GameMove, UserData} from '../../../../common/interfaces/game_interfaces';
import {AppFullPageContainer} from '../../../common/styled/AppFullSizeContainer';
import {GameTable} from '../../../../common/models/game_table';
import {GameTableFields} from '../../../../server/enums/database';
import {APP_GAMEBOARD_COLUMNS, APP_GAMEBOARD_ROWS,} from '../../constants/app_gameboard';
import {AppGameBoardTableCell} from './AppGameBoardTableCell';
import {AppPageStyledGameBoardTable} from '../../styled/game_board/AppPageStyledGameBoardTable';
import {PlayerColors} from '../../../../common/helpers/game_helper';
import {boundMethod} from 'autobind-decorator';
import {mapFiguresToCoords} from '../../utils/gameboard';
import {socketManager} from '../../utils/socket';
import {getCoordinatesFromString} from '../../../../common/utils/utils';

interface AppGameBoardProps {
    gameData: GameDataWithPlayerNames;
    playerColor: PlayerColors;
    userData: UserData;
    lastMove: GameMove;
}
interface AppGameBoardState {
    highlightedCells: string[];
}
interface AppGameBoardRefs {
    [coord: string]: React.RefObject<HTMLTableCellElement>;
}

export class AppGameBoard extends React.Component<AppGameBoardProps, AppGameBoardState> {
    private gameTable: GameTable;
    private cellRefs: AppGameBoardRefs = {};
    private draggedElement: HTMLElement = null;
    private selectedCell: Coordinates = null;

    public state: AppGameBoardState = {
        highlightedCells: [],
    };

    public render(): React.ReactNode {
        return (
            <AppFullPageContainer>
                <AppPageStyledGameBoardTable>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </AppPageStyledGameBoardTable>
            </AppFullPageContainer>
        );
    }
    public constructor(props: AppGameBoardProps) {
        super(props);

        this.gameTable = new GameTable(props.gameData[GameTableFields.GAME_DATA]);
    }

    public componentDidMount(): void {
        this.initialize();
    }
    public componentDidUpdate(prevProps: Readonly<AppGameBoardProps>): void {
        const {
            gameData,
            userData,
            lastMove,
        } = this.props;
        const {
            id,
        } = userData;
        const {
            active_player: activePlayer,
        } = gameData;
        const {
            active_player: previousActivePlayer,
        } = prevProps.gameData;

        if (activePlayer !== previousActivePlayer && activePlayer === id) {
            this.calculateCellsToHighlight();
        }

        if (lastMove !== prevProps.lastMove) {
            this.gameTable.moveFigure(getCoordinatesFromString(lastMove.from), getCoordinatesFromString(lastMove.to));
            this.forceUpdate();
        }
    }
    public componentWillUnmount(): void {
        this.detachEvents();
    }
    private initialize(): void {
        const {
            gameData,
            userData,
        } = this.props;
        this.attachEvents();

        if (gameData[GameTableFields.ACTIVE_PLAYER] === userData.id) {
            this.calculateCellsToHighlight();
        }
    }
    private attachEvents(): void {
        // PLACEHOLDER
    }
    private detachEvents(): void {
        // PLACEHOLDER
    }
    private renderRows(): React.ReactNode[] {
        const rows = [];

        for (let i = 0; i < APP_GAMEBOARD_ROWS; i++) {
            const row = (
                <tr key={i}>
                    {this.renderCells(i)}
                </tr>
            );
            rows.push(row);
        }

        return rows;
    }
    private renderCells(row: number): React.ReactNode[] {
        const cells = [];
        const selectedCoords = this.selectedCell && `${this.selectedCell.x}x${this.selectedCell.y}`;

        for (let i = 0; i < APP_GAMEBOARD_COLUMNS; i++) {
            const figure = this.gameTable.getFigureFromCoords(i, row);
            const cell = `${i}x${row}`;
            const ref = React.createRef<HTMLTableCellElement>();

            this.cellRefs[`${i}x${row}`] = ref;

            cells.push(
                <AppGameBoardTableCell
                    key={i}
                    row={row}
                    column={i}
                    color={figure?.color}
                    figure={figure?.type}
                    selected={cell === selectedCoords}
                    highlighted={this.state.highlightedCells.includes(cell)}
                    onDragStart={this.onDragStart}
                    onCellClick={this.onCellClick}
                    ref={ref}
                />
            );
        }

        return cells;
    }
    private calculateCellsToHighlight(): void {
        const {
            playerColor,
        } = this.props;
        const figuresAbleToMove = this.gameTable.getFiguresAbleToMove(playerColor);
        const highlightedCells = mapFiguresToCoords(figuresAbleToMove);

        this.setState({
            highlightedCells,
        });
    }
    private resetHighlightedCells(): void {
        this.setState({
            highlightedCells: [],
        });

    }
    @boundMethod
    private onCellClick(cell: Coordinates): void {
        const isSelectedCellHighlighted = this.state.highlightedCells.includes(`${cell.x}x${cell.y}`);
        const {
            userData,
            gameData,
        } = this.props;

        if (!this.selectedCell && isSelectedCellHighlighted) {
            const figure = this.gameTable.getFigureFromCoords(cell.x, cell.y);

            if (figure) {
                const highlightedCells = this.gameTable.calculatePossibleMoves(figure, cell).map((position) => {
                    return `${position.x}x${position.y}`;
                });

                this.selectedCell = cell;
                this.setState({
                    highlightedCells,
                });
            }
        } else if (this.selectedCell && this.selectedCell.x === cell.x && this.selectedCell.y === cell.y) {
            this.calculateCellsToHighlight();
            this.selectedCell = null;
        } else if (this.selectedCell && isSelectedCellHighlighted) {
            this.resetHighlightedCells();

            socketManager.emitPlayerMovedFigureInGame(userData.id, gameData[GameTableFields.ID], {
                from: `${this.selectedCell.x}x${this.selectedCell.y}`,
                to: `${cell.x}x${cell.y}`,
            });

            this.selectedCell = null;
        }
    }
    @boundMethod
    private onDragStart(e: SyntheticEvent): void {
        this.draggedElement = e.target as HTMLElement;
    }
}
