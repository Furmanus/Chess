import styled from 'styled-components';

interface AppStyledSpanProps {
    fontWeight?: 'lighter' | 'normal' | 'bold' | 'bolder';
    fontSize?: 'large' | 'submedium' | 'medium' | 'small';
}

export const AppStyledSpan = styled.span<AppStyledSpanProps>`
    ${(props) => props.fontWeight ? `font-weight: ${props.fontWeight};` : ''}
    ${(props) => props.fontSize ? `font-size: ${props.theme.font.size[props.fontSize]}` : ''}
`;
