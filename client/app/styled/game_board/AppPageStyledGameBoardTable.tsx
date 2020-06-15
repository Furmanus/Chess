import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<void, ITheme>;

export const AppPageStyledGameBoardTable = styled.table`
    border-collapse: collapse;
    border: 36px solid ${(props: ThemedProps) => props.theme.color.background.tableBorder};
`;
