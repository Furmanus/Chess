import * as React from 'react';
import {GameDataWithPlayerNames} from '../../../../common/interfaces/game_interfaces';
import {AppFullPageContainer} from '../../../common/styled/AppFullSizeContainer';
import {theme} from '../../../common/theme/theme';
import {AppStyledLoader} from '../../../common/styled/AppStyledLoader';
import {GameTable} from '../../../../common/models/game_table';
import {GameTableFields} from '../../../../server/enums/database';
import {
    APP_GAMEBOARD_COLUMNS,
    APP_GAMEBOARD_ROWS,
} from '../../constants/app_gameboard';
import {AppGameBoardTableCell} from './AppGameBoardTableCell';
import {AppPageStyledGameBoardTable} from '../../styled/game_board/AppPageStyledGameBoardTable';

interface AppGameBoardProps {
    gameData: GameDataWithPlayerNames;
}

export class AppGameBoard extends React.PureComponent<AppGameBoardProps> {
    private gameTable: GameTable;
    private isLeftMouseDown: boolean;

    public state = {
        isLoadingAssets: false,
        areAssetsLoaded: false,
    };

    public render(): React.ReactNode {
        const {
            isLoadingAssets,
        } = this.state;

        return (
            <React.Fragment>
                {
                    isLoadingAssets ?
                        <AppStyledLoader
                            type="RevolvingDot"
                            color={theme.color.background.darkblue}
                            width={150}
                            height={150}
                        /> :
                        <AppFullPageContainer>
                            <AppPageStyledGameBoardTable>
                                <tbody>
                                    {this.renderRows()}
                                </tbody>
                            </AppPageStyledGameBoardTable>
                        </AppFullPageContainer>
                }
            </React.Fragment>
        );
    }
    public constructor(props: AppGameBoardProps) {
        super(props);

        this.gameTable = new GameTable(props.gameData[GameTableFields.GAME_DATA]);
    }

    public componentDidMount(): void {
        this.initialize();
    }
    public componentWillUnmount(): void {
        this.detachEvents();
    }
    private initialize(): void {
        this.attachEvents();
    }
    private attachEvents(): void {
    }
    private detachEvents(): void {
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

        for (let i = 0; i < APP_GAMEBOARD_COLUMNS; i++) {
            const figure = this.gameTable.getFigureFromCoords(i, row);

            cells.push(
                <AppGameBoardTableCell
                    key={i}
                    row={row}
                    column={i}
                    color={figure?.color}
                    figure={figure?.type}
                />
            );
        }

        return cells;
    }
}
