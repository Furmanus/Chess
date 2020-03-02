import * as React from 'react';
import {UserData} from '../../../../common/interfaces/game_interfaces';
import {FaUser} from 'react-icons/all';
import {SyntheticEvent} from 'react';
import {boundMethod} from 'autobind-decorator';

interface AppPageUserListItemProps {
    user: UserData;
    onRightClick: (id: number) => void;
}

export class AppPageUserListItem extends React.Component<AppPageUserListItemProps, {}> {
    public render(): React.ReactNode {
        const {
            user,
        } = this.props;

        return (
            <li onContextMenu={this.onListItemRightClick}>
                <FaUser size="16px"/>
                <span>{user.login}</span>
            </li>
        );
    }
    @boundMethod
    private onListItemRightClick(e: SyntheticEvent): void {
        const {
            user,
            onRightClick,
        } = this.props;

        e.preventDefault();

        onRightClick(user.id);
    }
}