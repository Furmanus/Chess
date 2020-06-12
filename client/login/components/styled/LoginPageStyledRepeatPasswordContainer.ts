import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

interface IContainerProps {
    readonly isVisible: boolean;
}

type ThemedProps = ThemedStyledProps<IContainerProps, ITheme>;

export const LoginPageStyledRepeatPasswordContainer = styled.div<IContainerProps>`
    width: 100%;
    max-height: ${(props: ThemedProps) => props.isVisible ? '56px' : '0'};
    overflow: hidden;
    margin-bottom: ${(props: ThemedProps) => props.isVisible ? '12px' : '0'};
    transition: max-height 0.3s ease-in-out;
`;
