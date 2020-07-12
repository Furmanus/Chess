import styled, {ThemedStyledProps} from 'styled-components';
import {APP_GAMEBOARD_CELL_SIZE} from '../../constants/app_gameboard';
import {ITheme} from '../../../common/theme/theme';

interface GameBoardCellProps {
    hasLightBackground: boolean;
    coordBefore: string;
    coordAfter: string;
    highlighted: boolean;
    selected: boolean;
}

type ThemedProps = ThemedStyledProps<GameBoardCellProps, ITheme>;

function renderDataBefore(props: ThemedProps): string {
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
function renderDataAfter(props: ThemedProps): string {
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

function getBoxShadowProperty(props: ThemedProps): string {
    if (props.highlighted) {
        return '0 0 16px #0000ff inset';
    } else if (props.selected) {
        return '0 0 16px #ff0000 inset';
    } else {
        return 'none';
    }
}

export const AppPageStyledGameBoardCell = styled.td<GameBoardCellProps>`
    position: static;
    width: ${APP_GAMEBOARD_CELL_SIZE}px;
    height: ${APP_GAMEBOARD_CELL_SIZE}px;
    vertical-align: middle;
    z-index: 10;
    text-align: center;
    box-shadow: ${(props: ThemedProps) => getBoxShadowProperty(props)};
    cursor: ${(props: ThemedProps) => props.highlighted ? 'pointer' : 'initial'};
    background: ${(props: ThemedProps) => props.hasLightBackground ?
        props.theme.color.background.cellLight :
        props.theme.color.background.cellDark};
        
    ${(props: ThemedProps) => renderDataBefore(props)}
    ${(props: ThemedProps) => renderDataAfter(props)}
`;
