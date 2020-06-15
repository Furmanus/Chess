import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<void, ITheme>;

export const AppPageStyledUserListWrapper = styled.div`
    float: right;
    width: 25%;
    height: 100%;
    border-radius: 12px;
    box-shadow: 0 0 ${(props: ThemedProps) => props.theme.boxShadowBlur.thin};
    background: ${(props: ThemedProps) => props.theme.color.background.secondary};
`;
