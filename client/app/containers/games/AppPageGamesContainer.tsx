import * as React from 'react';
import {AppPageStyledSubPageGamesContentWrapper} from '../../styled/games/AppPageStyledSubPageGamesContentWrapper';
// @ts-ignore
import * as Fade from 'react-reveal/Fade';
import {ThunkDispatch} from 'redux-thunk';
import {changeFilter, createGame, fetchGames, joinUserToGame,} from '../../actions/app_actions';
import {connect, ConnectedProps} from 'react-redux';
import {boundMethod} from 'autobind-decorator';
import {AppStore} from '../../reducers/app_reducer';
import {GameDataWithPlayerNames} from '../../../../common/interfaces/game_interfaces';
import {AppPageGameBrick} from '../../components/games/AppPageGameBrick';
import {AppPageGamesEmptyState} from '../../components/games/AppPageGamesEmptyState';
import {theme} from '../../../common/theme/theme';
import {AppStyledLoader} from '../../../common/styled/AppStyledLoader';
import {AppStyledOpaqueContainer} from '../../../common/styled/AppStyledOpaqueContainer';
import {GameTableFields, UserTableFields} from '../../../../server/enums/database';
import {GamesFilter} from '../../constants/app_games';
import {getChoosenGames} from '../../selectors/selectors';
import {AppPageGameNav} from '../../components/games/AppPageGameNav';

interface DispatchProps {
    createGame: () => void;
    fetchGames: () => void
    changeFilter: (value: GamesFilter) => void;
    joinGame: (userId: number, gameId: number) => void;
}
interface StateProps {
    games: GameDataWithPlayerNames[];
    isCreatingGame: boolean;
    isFetchingGames: boolean;
    activeUserId: number;
    gamesFilter: GamesFilter;
}

function mapStateToProps(state: AppStore): StateProps {
    return {
        games: getChoosenGames(state),
        isCreatingGame: state.isCreatingGame,
        isFetchingGames: state.isLoadingGames,
        activeUserId: state.userSettings[UserTableFields.ID],
        gamesFilter: state.gamesFilter,
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
        changeFilter: (value: GamesFilter) => {
            dispatch(changeFilter(value));
        },
        joinGame: (userId: number, gameId: number) => {
            dispatch(joinUserToGame(userId, gameId));
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
            gamesFilter,
        } = this.props;
        const shouldBlockActions = isCreatingGame || isFetchingGames;

        return (
            <React.Fragment>
                <AppPageGameNav
                    shouldBlockActions={shouldBlockActions}
                    onCreateGameClick={this.onCreateGameClick}
                    onFilterChange={this.onFilterChange}
                    selectedFilter={gamesFilter}
                />
                <AppPageStyledSubPageGamesContentWrapper>
                    {
                        isFetchingGames ?
                            <AppStyledLoader
                                type="RevolvingDot"
                                color={theme.color.background.darkblue}
                                width={150}
                                height={150}
                            /> :
                            <Fade>
                                <React.Fragment>
                                    <AppStyledOpaqueContainer
                                        opacity={shouldBlockActions ? 0.3 : 1}
                                    >
                                        {this.renderGames()}
                                    </AppStyledOpaqueContainer>
                                    {
                                        isCreatingGame &&
                                        <AppStyledLoader
                                            type="RevolvingDot"
                                            color={theme.color.background.darkblue}
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
    @boundMethod
    private onFilterChange(value: GamesFilter): void {
        this.props.changeFilter(value);
    }
    private renderGames(): React.ReactNode {
        const {
            games,
            isFetchingGames,
            isCreatingGame,
            activeUserId,
        } = this.props;

        if (games.length) {
            return games.map((game: GameDataWithPlayerNames) => {
                // TODO zbadac czemu tu string wraca?
                const turnReady = activeUserId === parseInt(game[GameTableFields.ACTIVE_PLAYER] as unknown as string);
                const isUserGame = activeUserId === game[GameTableFields.PLAYER1_ID] || activeUserId === game[GameTableFields.PLAYER2_ID];

                return (
                    <AppPageGameBrick
                        key={game.id}
                        data={game}
                        turnReady={turnReady}
                        disabled={isFetchingGames || isCreatingGame}
                        isCurrentUserGame={isUserGame}
                        onButtonClick={this.onBrickButtonClick}
                    />
                );
            })
        }

        return (
            <AppPageGamesEmptyState/>
        );
    }
    @boundMethod
    private onBrickButtonClick(game: GameDataWithPlayerNames): void {
        const {
            activeUserId,
            joinGame,
        } = this.props;
        const {
            id: gameId,
        } = game;
        const isUserGame = activeUserId === game[GameTableFields.PLAYER1_ID] || activeUserId === game[GameTableFields.PLAYER2_ID];
        const isVacantGame = activeUserId !== game[GameTableFields.PLAYER1_ID] && game[GameTableFields.PLAYER2_ID] === null;

        if (isVacantGame) {
            joinGame(activeUserId, gameId);
        }
    }
}

export const AppPageGamesContainer = connector(AppPageGamesContainerClass);