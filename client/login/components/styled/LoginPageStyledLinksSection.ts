import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<void, ITheme>;

export const LoginPageStyledLinksSection = styled.div`
    width: 100%;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
    a.register {
        text-decoration: none;
        color: ${(props: ThemedProps) => props.theme.color.font.blue};
        font-size: ${(props: ThemedProps) => props.theme.font.size.submedium};
    }
`;
