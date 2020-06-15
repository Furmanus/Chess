import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../common/theme/theme';

type ThemedProps = ThemedStyledProps<void, ITheme>;

export const AppPageStyledMainSectionWrapper = styled.main`
    width: 82%;
    background: ${(props: ThemedProps) => props.theme.color.background.primary};
`;
