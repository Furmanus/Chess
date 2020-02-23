import * as React from 'react';
import {AppPageStyledSubPageHeading} from '../../styled/games/AppPageStyledSubPageHeading';
import {AppPageStyledSubPageGamesContentWrapper} from '../../styled/games/AppPageStyledSubPageGamesContentWrapper';
import {AppButton} from '../../../common/components/AppButton';
import {appPageTranslations, Languages} from '../../constants/app_translations';
// @ts-ignore
import * as Fade from 'react-reveal/Fade';
import {ThunkDispatch} from 'redux-thunk';
import {
    createGame,
    fetchGames,
} from '../../actions/app_actions';
import {connect, ConnectedProps} from 'react-redux';
import {boundMethod} from 'autobind-decorator';
import {AppStore} from '../../reducers/app_reducer';
import {GameDataWithPlayerNames} from '../../../../common/interfaces/game_interfaces';
import {AppPageGameBrick} from '../../components/games/AppPageGameBrick';
import {AppPageGamesEmptyState} from '../../components/games/AppPageGamesEmptyState';
import {theme} from '../../../common/theme/theme';
import {AppStyledLoader} from '../../../common/styled/AppStyledLoader';

interface DispatchProps {
    createGame: () => void;
    fetchGames: () => void
}
interface StateProps {
    games: GameDataWithPlayerNames[];
    isCreatingGame: boolean;
    isFetchingGames: boolean;
}

function mapStateToProps(state: AppStore): StateProps {
    return {
        games: state.games,
        isCreatingGame: state.isCreatingGame,
        isFetchingGames: state.isLoadingGames,
    };
}
function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>): DispatchProps {
    return {
        createGame: () => {
            dispatch(createGame());
        },
        fetchGames: () => {
            dispatch(fetchGames());
        },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ComponentProps = PropsFromRedux;

class AppPageGamesContainerClass extends React.Component<ComponentProps, {}> {
    public render(): React.ReactNode {
        const {
            isFetchingGames,
            isCreatingGame,
        } = this.props;
        const shouldBlockActions = isCreatingGame || isFetchingGames;

        return (
            <React.Fragment>
                <AppPageStyledSubPageHeading>
                    <AppButton
                        width={128}
                        height={40}
                        type="button"
                        onClick={this.onCreateGameClick}
                        disabled={shouldBlockActions}
                    >
                        {appPageTranslations[Languages.EN].games.create}
                    </AppButton>
                </AppPageStyledSubPageHeading>
                <AppPageStyledSubPageGamesContentWrapper
                    opaque={shouldBlockActions}
                >
                    {
                        isFetchingGames ?
                            <AppStyledLoader
                                type="RevolvingDot"
                                color={theme.color.background.darkgray}
                                width={150}
                                height={150}
                            /> :
                            <Fade>
                                <React.Fragment>
                                    {this.renderGames()}
                                    {
                                        isCreatingGame &&
                                        <AppStyledLoader
                                            type="RevolvingDot"
                                            color={theme.color.background.darkgray}
                                            width={150}
                                            height={150}
                                        />
                                    }
                                </React.Fragment>
                            </Fade>
                    }
                </AppPageStyledSubPageGamesContentWrapper>
            </React.Fragment>
        );
    }
    public componentDidMount(): void {
        const {
            fetchGames,
        } = this.props;

        fetchGames();
    }

    @boundMethod
    private onCreateGameClick(): void {
        const {
            createGame,
            isFetchingGames,
            isCreatingGame,
        } = this.props;

        if (!isFetchingGames && !isCreatingGame) {
            createGame();
        }
    }
    private renderGames(): React.ReactNode {
        const {
            games,
            isFetchingGames,
            isCreatingGame,
        } = this.props;

        if (games.length) {
            return games.map((game: GameDataWithPlayerNames) => (
                <AppPageGameBrick
                    key={game.id}
                    data={game}
                    disabled={isFetchingGames || isCreatingGame}
                />
            ))
        }

        return (
            <AppPageGamesEmptyState/>
        );
    }
}

export const AppPageGamesContainer = connector(AppPageGamesContainerClass);