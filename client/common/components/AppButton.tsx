import * as React from 'react';
import {AppStyledButton} from '../styled/AppStyledButton';
import {noop} from '../utils/utils';
import {FontSize} from '../interfaces/styled';
import {boundMethod} from 'autobind-decorator';
import {SyntheticEvent} from 'react';

interface AppButtonProps {
    width?: number;
    height?: number;
    fontSize?: FontSize;
    type: 'submit' | 'reset' | 'button';
    onClick?: () => void;
    variation?: 'normal' | 'ghost';
    disabled?: boolean;
}

export class AppButton extends React.Component<AppButtonProps, {}> {
    public static defaultProps: Partial<AppButtonProps> = {
        onClick: noop,
        disabled: false,
        variation: 'normal',
    };
    public render(): React.ReactNode {
        const {
            children,
            ...otherProps
        } = this.props;

        return (
            <AppStyledButton onClick={this.handleClick} {...otherProps}>
                {children}
            </AppStyledButton>
        );
    }
    @boundMethod
    private handleClick(e: SyntheticEvent): void {
        const {
            disabled,
            onClick,
        } = this.props;

        e.stopPropagation();

        if (!disabled) {
            onClick();
        }
    }
}
