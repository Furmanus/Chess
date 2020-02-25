import styled from 'styled-components';

export const AppPageStyledGameBrickTurnReadyElement = styled.div`
    position: absolute;
    height: 20px;
    right: 0;
    top: -10px;
    background: ${(props) => props.theme.color.background.blue};
    padding: 3px 6px;
    text-align: center;
    text-transform: uppercase;
    border-radius: 8px;
    letter-spacing: 1.10;
    color: ${(props) => props.theme.color.font.white};
    font-weight: ${(props) => props.theme.font.weight.bold};
    font-size: ${(props) => props.theme.font.size.subsmall};
`;
