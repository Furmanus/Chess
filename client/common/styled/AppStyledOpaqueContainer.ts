import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../theme/theme';

interface AppStyledOpaqueContainerProps {
    opacity: number;
}

type ThemedProps = ThemedStyledProps<AppStyledOpaqueContainerProps, ITheme>

export const AppStyledOpaqueContainer = styled.div<AppStyledOpaqueContainerProps>`
    opacity: ${(props: ThemedProps) => props.opacity};
`;
