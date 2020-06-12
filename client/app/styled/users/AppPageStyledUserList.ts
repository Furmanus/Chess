import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<{}, ITheme>;

export const AppPageStyledList = styled.ul`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    
    li {
        padding: 3px 8px;
        height: 40px;
        font-size: ${(props: ThemedProps) => props.theme.font.size.small};
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px;
        transition: 0.4s ease-in-out;
        
        &:hover {
            cursor: pointer;
            background: ${(props: ThemedProps) => props.theme.color.background.primary};
            box-shadow: 0 0 ${(props: ThemedProps) => props.theme.boxShadowBlur.veryThin + ' ' + props.theme.color.background.darkgray} inset;
        }
    }
`;
