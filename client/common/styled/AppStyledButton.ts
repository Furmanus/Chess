import styled from 'styled-components';
import {StyledProps} from '../interfaces/styled';
import {Link} from 'react-router-dom';

interface AppButtonProps {
    readonly width?: number;
    readonly height?: number;
    readonly marginTop?: number;
    readonly fontSize?: 'subsmall' | 'small' | 'submedium' | 'medium' | 'large';
    readonly variation?: 'normal' | 'ghost';
    readonly disabled?: boolean;
}

function getFontSize(props: StyledProps<AppButtonProps>): number {
    switch (props.fontSize) {
        case 'small':
            return 12;
        case 'submedium':
            return 14;
        case 'medium':
            return 16;
        case 'large':
            return 20;
        default:
            return 14;
    }
}

function getColor(props: StyledProps<AppButtonProps>): string {
    switch (props.variation) {
        case 'ghost':
            if (props.disabled) {
                return props.theme.color.font.secondary;
            }
            return props.theme.color.font.blue;
        case 'normal':
        default:
            return props.theme.color.font.white;
    }
}
function getHoverColor(props: StyledProps<AppButtonProps>): string {
    switch (props.variation) {
        case 'ghost':
            if (props.disabled) {
                return props.theme.color.font.secondary;
            }
            return props.theme.color.font.white;
        case 'normal':
        default:
            return props.theme.color.font.white;
    }
}
function getBackgroundColor(props: StyledProps<AppButtonProps>): string {
    if (props.variation === 'ghost') {
        return 'transparent';
    } else {
        if (props.disabled) {
            return props.theme.color.background.darkgray;
        } else {
            return props.theme.color.background.blue;
        }
    }
}
function getHoverBackgroundColor(props: StyledProps<AppButtonProps>): string {
    if (props.variation === 'ghost') {
        if (props.disabled) {
            return 'transparent';
        }
        return props.theme.color.background.blue;
    } else {
        if (props.disabled) {
            return props.theme.color.background.darkgray;
        }
        return props.theme.color.background.darkblue;
    }
}
function getCursor(props: StyledProps<AppButtonProps>): string {
    if (props.disabled) {
        return 'not-allowed';
    }
    return 'pointer';
}

function getStylesCssText(props: StyledProps<AppButtonProps>, isHistoryLink: boolean = false): string {
    return `
        width: ${props.width ? `${props.width}px` : '100%'};
        height: ${props.height ? `${props.height}px` : '56px'};
        border-radius: 8px;
        text-transform: uppercase;
        ${props.marginTop ? `margin-top: ${props.marginTop}px;` : ''}
        font-weight: ${props.theme.font.weight.bold};
        font-size: ${props.theme.font.size.medium};
        color: ${getColor(props)};
        background-color: ${getBackgroundColor(props)};
        border: none;
        outline: none;
        transition: all 0.3s ease-in-out;
        font-size: ${getFontSize(props)}px;
        ${isHistoryLink ? 'display: flex; align-items: center; justify-content: center; text-decoration: none' : ''}
        
        &:hover {
            color: ${getHoverColor(props)};
            background-color: ${getHoverBackgroundColor(props)};
            cursor: ${getCursor(props)};
        }
    `;
}

export const AppStyledButton = styled.button<AppButtonProps>`
    ${(props) => getStylesCssText(props)};
`;
export const AppStyledHistoryLink = styled(Link)<any>`
    ${(props) => getStylesCssText(props, true)};
`;
