import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<{}, ITheme>;

export const LoginPageStyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    color: ${(props: ThemedProps) => props.theme.color.font.secondary};
`;
