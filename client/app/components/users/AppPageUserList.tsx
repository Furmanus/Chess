import * as React from 'react';
import {LoggedUsersClient} from '../../../../common/interfaces/game_interfaces';
import {AppPageStyledUserListWrapper} from '../../styled/users/AppPageStyledUserListWrapper';
import {AppPageStyledList} from '../../styled/users/AppPageStyledUserList';
import {AppPageUserListItem} from './AppPageUserListItem';
import {boundMethod} from 'autobind-decorator';

interface AppPageUserListProps {
    users: LoggedUsersClient;
}

export class AppPageUserList extends React.Component<AppPageUserListProps, {}> {
    public render(): React.ReactNode {
        const {
            users,
        } = this.props;

        return (
            <AppPageStyledUserListWrapper>
                <AppPageStyledList>
                    {Object.keys(users).map((key: string) => {
                        return (
                            // TODO fix type casts
                            <AppPageUserListItem
                                key={key}
                                user={{id: key as any, login: users[key as any]}}
                                onRightClick={this.onUserListRightClick}
                            />
                        );
                    })}
                </AppPageStyledList>
            </AppPageStyledUserListWrapper>
        );
    }
    @boundMethod
    private onUserListRightClick(id: number): void {
        console.log(id);
    }
}