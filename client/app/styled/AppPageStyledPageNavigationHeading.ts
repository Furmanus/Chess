import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../common/theme/theme';

type ThemedProps = ThemedStyledProps<{}, ITheme>;

export const AppPageStyledPageNavigationHeading = styled.div`
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${(props: ThemedProps) => props.theme.border.color.black};
`;
