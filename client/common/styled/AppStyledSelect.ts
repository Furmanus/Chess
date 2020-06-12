import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../theme/theme';

interface AppStyledSelectProps {
    disabled: boolean;
}

type ThemedProps = ThemedStyledProps<AppStyledSelectProps, ITheme>;

export const AppStyledSelect = styled.select<AppStyledSelectProps>`
    display: block;
    padding: 3px 5px;
    height: 40px;
    border-radius: 8px;
    outline: none;
    margin: 0;
    box-shadow: 0 0 1px;
    transition: 0.4s;
    opacity: ${(props: ThemedProps) => props.disabled ? '0.3' : '1'};
    
    &:focus {
        border-color: ${(props: ThemedProps) => props.theme.border.color.blue};
        border-width: 2px;
        box-shadow: 0 0 ${(props: ThemedProps) => props.theme.boxShadowBlur.veryThin} ${(props) => props.theme.border.color.blue};
    }
    &:hover {
        cursor: ${(props: ThemedProps) => props.disabled ? 'not-allowed' : 'pointer'};
    }
`;
