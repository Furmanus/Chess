import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<void, ITheme>;

export const LoginPageStyledFormErrorContainer = styled.div`
    color: ${(props: ThemedProps) => props.theme.color.font.error};
    font-size: ${(props: ThemedProps) => props.theme.font.size.small};
    margin-top: 12px;
`;
