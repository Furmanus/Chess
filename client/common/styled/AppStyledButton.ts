import styled from 'styled-components';
import {FontSize, StyledProps} from '../interfaces/styled';

interface AppButtonProps {
    readonly width?: number;
    readonly height?: number;
    readonly marginTop?: number;
    readonly fontSize?: FontSize;
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
export const AppStyledButton = styled.button<AppButtonProps>`
    width: ${(props) => props.width ? `${props.width}px` : '100%'};
    height: ${(props) => props.height ? `${props.height}px` : '56px'};
    border-radius: 8px;
    text-transform: uppercase;
    ${(props) => props.marginTop ? `margin-top: ${props.marginTop}px;` : ''}
    font-weight: ${(props) => props.theme.font.weight.bold};
    font-size: ${(props) => props.theme.font.size.medium};
    color: ${(props) => getColor(props)};
    background-color: ${(props) => getBackgroundColor(props)};
    border: none;
    outline: none;
    transition: all 0.3s ease-in-out;
    font-size: ${(props) => getFontSize(props)}px;
    
    &:hover {
        color: ${(props) => getHoverColor(props)};
        background-color: ${(props) => getHoverBackgroundColor(props)};
        cursor: ${(props) => getCursor(props)};
    }
`;