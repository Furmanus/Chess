import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<void, ITheme>;

export const LoginPageStyledIconContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    background: ${(props: ThemedProps) => props.theme.color.background.red};
    
    svg {
        fill: ${(props: ThemedProps) => props.theme.color.svg.white};
    }
`;
