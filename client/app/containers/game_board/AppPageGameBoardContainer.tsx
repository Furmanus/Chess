import * as React from 'react';
import {GameDataWithPlayerNames, GameMove, UserData} from '../../../../common/interfaces/game_interfaces';
import {AppStore} from '../../reducers/app_reducer';
import {fetchGameData, leaveGame} from '../../actions/app_actions';
import {connect, ConnectedProps} from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {AppPageStyledSubPageHeading} from '../../styled/games/AppPageStyledSubPageHeading';
import {AppPageStyledGameBoardContainer} from '../../styled/game_board/AppPageStyledGameBoardContainer';
import {theme} from '../../../common/theme/theme';
import {AppStyledLoader} from '../../../common/styled/AppStyledLoader';
import {AppGameBoard} from '../../components/game_board/AppGameBoard';
import {PlayerColors} from '../../../../common/helpers/game_helper';
import {getCurrentPlayerColor, getSettings} from '../../selectors/selectors';
import {AppThunkDispatch} from '../../interfaces/thunk';

interface StateProps {
    isFetchingActiveGameData: boolean;
    activeGame: GameDataWithPlayerNames;
    playerColor: PlayerColors;
    userSettings: UserData;
    lastMove: GameMove;
}
interface DispatchProps {
    fetchActiveGameData: (gameId: number) => void;
    leaveGame: () => void;
}
interface MatchParams {
    gameId: string;
}

function mapStateToProps(state: AppStore): StateProps {
    return {
        isFetchingActiveGameData: state.isFetchingActiveGame,
        activeGame: state.activeGame,
        lastMove: state.lastMove,
        playerColor: getCurrentPlayerColor(state),
        userSettings: getSettings(state),
    };
}
function mapDispatchToProps(dispatch: AppThunkDispatch): DispatchProps {
    return {
        fetchActiveGameData: (gameId: number) => {
            dispatch(fetchGameData(gameId));
        },
        leaveGame: () => {
            dispatch(leaveGame());
        },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ComponentProps = PropsFromRedux & RouteComponentProps<MatchParams>;

class AppPageGameBoardClass extends React.Component<ComponentProps, {}> {
    public render(): React.ReactNode {
        const {
            isFetchingActiveGameData,
            activeGame,
            playerColor,
            userSettings,
            lastMove,
        } = this.props;

        return (
            <React.Fragment>
                <AppPageStyledSubPageHeading/>
                <AppPageStyledGameBoardContainer>
                    {isFetchingActiveGameData && (
                        <AppStyledLoader
                            type="RevolvingDot"
                            color={theme.color.background.darkblue}
                            width={150}
                            height={150}
                        />
                    )}
                    {Boolean(activeGame) && (
                        <AppGameBoard
                            gameData={activeGame}
                            playerColor={playerColor}
                            userData={userSettings}
                            lastMove={lastMove}
                        />
                    )}
                </AppPageStyledGameBoardContainer>
            </React.Fragment>
        );
    }
    public componentDidMount(): void {
        const {
            fetchActiveGameData,
        } = this.props;

        fetchActiveGameData(Number(this.props.match.params.gameId));
    }
    public componentWillUnmount(): void {
        const {
            leaveGame,
        } = this.props;

        leaveGame();
    }
}

export const AppPageGameBoardContainer = connector(AppPageGameBoardClass);
