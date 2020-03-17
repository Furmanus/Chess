import * as React from 'react';
import {GameDataWithPlayerNames} from '../../../../common/interfaces/game_interfaces';
import {AppStore} from '../../reducers/app_reducer';
import {fetchGameData} from '../../actions/app_actions';
import {ThunkDispatch} from 'redux-thunk';
import {connect, ConnectedProps} from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {AppPageStyledSubPageHeading} from '../../styled/games/AppPageStyledSubPageHeading';
import {AppPageStyledGameBoardContainer} from '../../styled/game_board/AppPageStyledGameBoardContainer';
import {theme} from '../../../common/theme/theme';
import {AppStyledLoader} from '../../../common/styled/AppStyledLoader';

interface StateProps {
    isFetchingActiveGameData: boolean;
    activeGame: GameDataWithPlayerNames;
}
interface DispatchProps {
    fetchActiveGameData: (gameId: number) => void;
}
interface MatchParams {
    gameId: string;
}

function mapStateToProps(state: AppStore): StateProps {
    return {
        isFetchingActiveGameData: state.isFetchingActiveGame,
        activeGame: state.activeGame,
    };
}
function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>): DispatchProps {
    return {
        fetchActiveGameData: (gameId: number) => {
            dispatch(fetchGameData(gameId));
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
}

export const AppPageGameBoard = connector(AppPageGameBoardClass);