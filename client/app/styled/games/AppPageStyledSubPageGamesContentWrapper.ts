import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

interface ComponentProps {
    opaque?: boolean;
}

type ThemedProps = ThemedStyledProps<ComponentProps, ITheme>;

export const AppPageStyledSubPageGamesContentWrapper = styled.div<ComponentProps>`
    position: relative;
    height: 85%;
    max-width: 100%;
    padding: 10px;
    overflow-y: auto;
    margin: auto;
    opacity: ${(props: ThemedProps) => props.opaque ? 0.5 : 1};
`;
