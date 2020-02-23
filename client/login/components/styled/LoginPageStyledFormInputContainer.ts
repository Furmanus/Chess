import styled from 'styled-components';
import {StyledProps} from '../../../common/interfaces/styled';

interface IFormInputContainerProps {
    showPlaceholder: boolean;
    isFocused: boolean;
    hasError?: boolean;
}

function getLegendStyles(props: IFormInputContainerProps): string {
    if (props.showPlaceholder) {
        return `
            padding-inline-start: 0;
            padding-inline-end: 0;
        `;
    }

    return '';
}
function getLabelSize(props: StyledProps<IFormInputContainerProps>): string {
    if (props.showPlaceholder) {
        return `${props.theme.font.size.medium}`;
    }

    return `${props.theme.font.size.small}`;
}

function getBorderStyles(props: StyledProps<IFormInputContainerProps>): string {
    if (props.isFocused) {
        return `
            border-width: 2px;
            border-color: ${props.theme.border.color.blue};
        `;
    }

    if (props.hasError) {
        return `
            border-width: 1px;
            border-color: ${props.theme.border.color.error};
        `;
    }

    return `
        border-width: 1px;
        border-color: ${props.theme.border.color.gray};
    `;
}
function getFontColor(props: StyledProps<IFormInputContainerProps>): string {
    if (props.showPlaceholder) {
        return props.theme.color.font.secondary;
    }

    return props.theme.color.font.primary;
}

export const LoginPageStyledFormInputContainer = styled.div<IFormInputContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: 56px;
    margin-bottom: 12px;
    
    input {
        position: absolute;
        top: 10px;
        left: 4px;
        width: calc(100% - 6px);
        border-radius: 5px;
        height: 44px;
        padding: 0 8px;
        border: none;
        font-size: ${(props) => props.theme.font.size.medium};
        
        &:focus {
            outline: none;
        }
    }
    label {
        position: absolute;
        left: 10px;
        top: 20px;
        color: ${(props) => getFontColor(props)};
        font-size: ${(props) => getLabelSize(props)};
        transform: ${(props) => props.showPlaceholder ? '' : 'translate(0, -20px)'};
        pointer-events: none;
        z-index: 2;
        transition: all 0.2s ease-in-out;
        
    }
    fieldset {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border-style: solid;
        padding-block-start: 0;
        padding-block-end: 0;
        margin-inline-start: 0;
        margin-inline-end: 0;
        color: ${(props) => props.theme.color.font.secondary};
        padding-inline-start: 6px;
        padding-inline-end: 10px;
        transition: all 0.2s ease-in-out;
        ${(props) => getBorderStyles(props)};
    
        legend {
            height: 18px;
            font-size: ${(props) => props.theme.font.size.small};
            visibility: hidden;
            ${(props) => getLegendStyles(props)};
        }
    }
`;

LoginPageStyledFormInputContainer.defaultProps = {
    hasError: false,
};
