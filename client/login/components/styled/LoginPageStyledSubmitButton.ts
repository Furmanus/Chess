import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<{}, ITheme>;

export const LoginPageStyledSubmitButton = styled.button`
    width: 100%;
    height: 56px;
    border-radius: 5px;
    text-transform: uppercase;
    margin-top: 6px;
    font-weight: ${(props: ThemedProps) => props.theme.font.weight.bold};
    font-size: ${(props: ThemedProps) => props.theme.font.size.medium};
    color: ${(props: ThemedProps) => props.theme.color.font.white};
    background-color: ${(props: ThemedProps) => props.theme.color.background.blue};
    border: none;
    transition: all 0.3s ease-in-out;
    
    &:hover {
        background-color: ${(props: ThemedProps) => props.theme.color.background.darkblue};
        cursor: pointer;
    }
`;
