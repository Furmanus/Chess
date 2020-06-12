import styled, {keyframes, ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<{}, ITheme>;

const animation = keyframes`
    from {
        opacity: 1;
    }
    to {
        transform: scale(1.3);
        opacity: 0;
    }
`;

export const AppPageStyledGameBrickTurnReadyElement = styled.div`
    position: absolute;
    height: 20px;
    right: 0;
    top: -10px;
    background: ${(props: ThemedProps) => props.theme.color.background.blue};
    padding: 3px 6px;
    text-align: center;
    text-transform: uppercase;
    border-radius: 8px;
    letter-spacing: 1.10;
    color: ${(props: ThemedProps) => props.theme.color.font.white};
    font-weight: ${(props: ThemedProps) => props.theme.font.weight.bold};
    font-size: ${(props: ThemedProps) => props.theme.font.size.subsmall};
    
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        border-radius: 8px;
        background: ${(props: ThemedProps) => props.theme.color.background.blue};
        z-index: -1;
        animation: ${animation} 1s ease infinite;
    }
`;
