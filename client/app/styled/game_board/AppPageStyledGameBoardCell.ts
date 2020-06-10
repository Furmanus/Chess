import styled from 'styled-components';
import {APP_GAMEBOARD_CELL_SIZE} from '../../constants/app_gameboard';

interface GameBoardCellProps {
    hasLightBackground: boolean;
    coordBefore: string;
    coordAfter: string;
    highlighted: boolean;
    selected: boolean;
}

function renderDataBefore(props: GameBoardCellProps): string {
    if (props.coordBefore) {
        return `
            &::before {
                content: "${props.coordBefore}";
                position: absolute;
                left: 24px;
                top: -24px;
                text-transform: uppercase;
                font-weight: bold;
            }
        `;
    }

    return '';
}
function renderDataAfter(props: GameBoardCellProps): string {
    if (props.coordAfter) {
        return `
            &::after {
                content: "${props.coordAfter}";
                position: absolute;
                left: -24px;
                top: 24px;
                text-transform: uppercase;
                font-weight: bold;
            }
        `;
    }

    return '';
}

function getBoxShadowProperty(props: GameBoardCellProps): string {
    if (props.highlighted) {
        return '0 0 16px #0000ff inset';
    } else if (props.selected) {
        return '0 0 16px #ff0000 inset';
    } else {
        return 'none';
    }
}

export const AppPageStyledGameBoardCell = styled.td<GameBoardCellProps>`
    position: relative;
    width: ${APP_GAMEBOARD_CELL_SIZE}px;
    height: ${APP_GAMEBOARD_CELL_SIZE}px;
    vertical-align: middle;
    z-index: 10;
    text-align: center;
    box-shadow: ${(props) => getBoxShadowProperty(props)};
    cursor: ${(props) => props.highlighted ? 'pointer' : 'initial'};
    background: ${(props) => props.hasLightBackground ?
        props.theme.color.background.cellLight :
        props.theme.color.background.cellDark};
        
    ${(props) => renderDataBefore(props)}
    ${(props) => renderDataAfter(props)}
`;
