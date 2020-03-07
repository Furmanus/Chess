import styled from 'styled-components';
import {StyledProps} from '../interfaces/styled';

interface AppStyledSelectProps {
    disabled: boolean;
}

export const AppStyledSelect = styled.select<AppStyledSelectProps>`
    display: block;
    padding: 3px 5px;
    height: 40px;
    border-radius: 8px;
    outline: none;
    margin: 0;
    box-shadow: 0 0 1px;
    transition: 0.4s;
    opacity: ${(props: StyledProps<AppStyledSelectProps>) => props.disabled ? '0.3' : '1'};
    
    &:focus {
        border-color: ${(props: StyledProps<AppStyledSelectProps>) => props.theme.border.color.blue};
        border-width: 2px;
        box-shadow: 0 0 ${(props) => props.theme.boxShadowBlur.veryThin} ${(props) => props.theme.border.color.blue};
    }
    &:hover {
        cursor: ${(props: StyledProps<AppStyledSelectProps>) => props.disabled ? 'not-allowed' : 'pointer'};
    }
`;
