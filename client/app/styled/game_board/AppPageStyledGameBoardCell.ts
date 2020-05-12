import styled from 'styled-components';
import {APP_GAMEBOARD_CELL_SIZE} from '../../constants/app_gameboard';

interface GameBoardCellProps {
    hasLightBackground: boolean;
    coordBefore: string;
    coordAfter: string;
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

export const AppPageStyledGameBoardCell = styled.td<GameBoardCellProps>`
    position: relative;
    width: ${APP_GAMEBOARD_CELL_SIZE}px;
    height: ${APP_GAMEBOARD_CELL_SIZE}px;
    vertical-align: middle;
    text-align: center;
    background: ${(props) => props.hasLightBackground ?
        props.theme.color.background.cellLight :
        props.theme.color.background.cellDark};
        
    ${(props) => renderDataBefore(props)}
    ${(props) => renderDataAfter(props)}
`;
