import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<void, ITheme>;

export const AppPageStyledGameBrickWrapper = styled.div`
    position: relative;
    padding: 10px;
    width: 250px;
    height: 300px;
    margin: 15px;
    border-radius: 8px;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 ${(props: ThemedProps) => props.theme.boxShadowBlur.thin};
    font-size: ${(props: ThemedProps) => props.theme.font.size.small};
    transition: 0.4s ease-in-out;
    
    &:hover {
        box-shadow: 0 0 ${(props: ThemedProps) => props.theme.boxShadowBlur.veryThick};
    }
    
    .players {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        span {
            margin-bottom: 4px;
        }
    }
`;
