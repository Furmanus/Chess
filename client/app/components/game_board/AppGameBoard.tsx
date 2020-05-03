import * as React from 'react';
import {GameDataWithPlayerNames} from '../../../../common/interfaces/game_interfaces';
import {AppFullPageContainer} from '../../../common/styled/AppFullSizeContainer';
import {boundMethod} from 'autobind-decorator';
import {theme} from '../../../common/theme/theme';
import {AppStyledLoader} from '../../../common/styled/AppStyledLoader';
import {GameTable} from '../../../../common/models/game_table';
import {GameTableFields} from '../../../../server/enums/database';

interface AppGameBoardProps {
    gameData: GameDataWithPlayerNames;
}
interface AppGameBoardState {
    isLoadingAssets: boolean;
    areAssetsLoaded: boolean;
}

export class AppGameBoard extends React.PureComponent<AppGameBoardProps, AppGameBoardState> {
    private element = React.createRef<HTMLDivElement>();
    private gameTable: GameTable;
    private isMouseClicked: boolean;

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
                        <AppFullPageContainer ref={this.element}/>
                }
            </React.Fragment>
        );
    }
    public componentDidMount(): void {
        this.gameTable = new GameTable(this.props.gameData[GameTableFields.GAME_DATA]);

        this.initialize();
    }
    public componentWillUnmount(): void {
        this.detachEvents();
    }
    private initialize(): void {
        const {
            current: container,
        } = this.element;
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.attachEvents();
    }
    private attachEvents(): void {
        const {
            current,
        } = this.element;
    }
    private detachEvents(): void {
        const {
            current,
        } = this.element;
    }
}
