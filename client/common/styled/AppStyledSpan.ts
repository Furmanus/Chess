import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../theme/theme';

interface AppStyledSpanProps {
    fontWeight?: 'lighter' | 'normal' | 'bold' | 'bolder';
    fontSize?: 'large' | 'submedium' | 'medium' | 'small';
}

type ThemedProps = ThemedStyledProps<AppStyledSpanProps, ITheme>;

export const AppStyledSpan = styled.span<AppStyledSpanProps>`
    ${(props: ThemedProps) => props.fontWeight ? `font-weight: ${props.fontWeight};` : ''}
    ${(props: ThemedProps) => props.fontSize ? `font-size: ${props.theme.font.size[props.fontSize]}` : ''}
`;
