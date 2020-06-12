import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../common/theme/theme';

type ThemedProps = ThemedStyledProps<{}, ITheme>;

export const AppPageStyledPageNavigationContainer = styled.section`
    width: 18%;
    background: ${(props: ThemedProps) => props.theme.color.background.navigation};
`;
