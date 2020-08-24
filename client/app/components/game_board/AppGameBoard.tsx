import * as React from 'react';
import {
    Coordinates,
    GameDataWithPlayerNames,
    GameMove,
    UserData,
} from '../../../../common/interfaces/game_interfaces';
import {AppFullPageContainer} from '../../../common/styled/AppFullSizeContainer';
import {GameTable} from '../../../../common/models/game_table';
import {GameTableFields} from '../../../../server/enums/database';
import {
    APP_GAMEBOARD_COLUMNS,
    APP_GAMEBOARD_ROWS,
} from '../../constants/app_gameboard';
import {AppGameBoardTableCell} from './AppGameBoardTableCell';
import {AppPageStyledGameBoardTable} from '../../styled/game_board/AppPageStyledGameBoardTable';
import {PlayerColors} from '../../../../common/helpers/game_helper';
import {boundMethod} from 'autobind-decorator';
import {
    createAnimation,
    mapFiguresToCoords,
} from '../../utils/gameboard';
import {socketManager} from '../../utils/socket';
import {getCoordinatesFromString} from '../../../../common/utils/utils';
import {getDistance} from '../../utils/utils';

interface AppGameBoardProps {
    gameData: GameDataWithPlayerNames;
    playerColor: PlayerColors;
    userData: UserData;
    lastMove: GameMove;
}
interface AppGameBoardState {
    highlightedCells: string[];
    dropZones: string[];
}
interface AppGameBoardRefs {
    [coord: string]: React.RefObject<HTMLTableCellElement>;
}

export class AppGameBoard extends React.Component<AppGameBoardProps, AppGameBoardState> {
    private gameTable: GameTable;
    private readonly cellRefs: AppGameBoardRefs = {};
    private readonly boardRef = React.createRef<HTMLTableSectionElement>();
    private selectedCell: Coordinates = null;

    public state: AppGameBoardState = {
        highlightedCells: [],
        dropZones: [],
    };

    public render(): React.ReactNode {
        return (
            <AppFullPageContainer>
                <AppPageStyledGameBoardTable>
                    <tbody ref={this.boardRef}>
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
    public async componentDidUpdate(prevProps: Readonly<AppGameBoardProps>): Promise<void> {
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

        if (lastMove?.from !== prevProps.lastMove?.from && lastMove?.to !== prevProps.lastMove?.to) {
            this.gameTable.moveFigure(getCoordinatesFromString(lastMove.from), getCoordinatesFromString(lastMove.to));

            await this.animateFigure(lastMove.from, lastMove.to);

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
                    isDropZone={this.state.dropZones.includes(cell)}
                    handleDrop={this.handleDrop}
                    handleDragStart={this.handleDragStart}
                    onCellClick={this.onCellClick}
                    ref={ref}
                />
            );
        }

        return cells;
    }
    private async animateFigure(from: string, to: string): Promise<void> {
        const fromCell = this.cellRefs[from].current;
        const toCell = this.cellRefs[to].current;
        const fromCoords = getCoordinatesFromString(from);
        const toCoords = getCoordinatesFromString(to);
        const dist = getDistance(fromCoords, toCoords);

        return createAnimation(fromCell, toCell, dist);
    }
    private calculateCellsToHighlight(): void {
        const {
            playerColor,
        } = this.props;
        const figuresAbleToMove = this.gameTable.getFiguresAbleToMove(playerColor);
        const highlightedCells = mapFiguresToCoords(figuresAbleToMove);

        this.setState({
            dropZones: [],
            highlightedCells,
        });
    }
    private resetHighlightedCells(): void {
        this.setState({
            highlightedCells: [],
        });

    }
    private isCellHighlighted(cell: Coordinates): boolean {
        const cellCoordsString = `${cell.x}x${cell.y}`;

        return this.state.highlightedCells.includes(cellCoordsString);
    }
    private selectCell(cell: Coordinates): void {
        if (!this.selectedCell && this.isCellHighlighted(cell)) {
            const figure = this.gameTable.getFigureFromCoords(cell.x, cell.y);
            const figureMoves = this.gameTable.getFigurePossibleMovesCoordsString(figure, cell);

            if (figure) {
                this.selectedCell = cell;

                this.setState({
                    highlightedCells: [...figureMoves, `${cell.x}x${cell.y}`],
                    dropZones: figureMoves,
                });
            }
        }
    }
    private unselectCell(cell: Coordinates): void {
        if (this.selectedCell.x === cell.x && this.selectedCell.y === cell.y) {
            this.selectedCell = null;

            this.calculateCellsToHighlight();
        }
    }
    private moveSelectedFigure(targetCell: Coordinates): void {
        const {
            userData,
            gameData,
        } = this.props;

        this.resetHighlightedCells();

        socketManager.emitPlayerMovedFigureInGame(userData.id, gameData[GameTableFields.ID], {
            from: `${this.selectedCell.x}x${this.selectedCell.y}`,
            to: `${targetCell.x}x${targetCell.y}`,
        });

        this.selectedCell = null;
    }
    @boundMethod
    private onCellClick(cell: Coordinates): void {
        const isSelectedCellHighlighted = this.isCellHighlighted(cell);

        if (!this.selectedCell && isSelectedCellHighlighted) {
            this.selectCell(cell);
        } else if (this.selectedCell && this.selectedCell.x === cell.x && this.selectedCell.y === cell.y) {
            this.unselectCell(cell);
        } else if (this.selectedCell && isSelectedCellHighlighted) {
            this.moveSelectedFigure(cell);
        }
    }
    @boundMethod
    private handleDragStart(coords: Coordinates): void {
        const selectedCell = this.selectedCell;

        if (!selectedCell) {
            this.selectCell(coords);
        }
    }
    @boundMethod
    private handleDrop(coords: Coordinates): void {
        this.moveSelectedFigure(coords);
    }
}
