import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../common/theme/theme';

type ThemedProps = ThemedStyledProps<{}, ITheme>;

export const AppPageStyledPageNavigationList = styled.nav`
    height: 85%;
    width: 100%;
    padding-top: 25px;
    
    ul {
        margin: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        
        li {
            list-style-type: none;
            
            &:last-child {
                margin-top: auto;
                margin-bottom: 30px;
            }
            a {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                text-decoration: none;
                color: ${(props: ThemedProps) => props.theme.color.font.white};
                font-size: ${(props: ThemedProps) => props.theme.font.size.medium};
                letter-spacing: 0.05rem;
                text-transform: uppercase;
                padding: 10px 0 10px 15px;
                
                span {
                    margin-left: 10px;
                }
                
                &:hover {
                    color: ${(props: ThemedProps) => props.theme.color.font.primary};
                    background: ${(props: ThemedProps) => props.theme.color.background.primary};
                    
                    &::before {
                        position: absolute;
                        top: -11px;
                        right: -3px;
                        content: '';
                        width: 10px;
                        height: 10px;
                        border-top: 3px solid ${(props: ThemedProps) => props.theme.color.background.primary};
                        border-left: 3px solid ${(props: ThemedProps) => props.theme.color.background.primary};
                        border-top-left-radius: 50%;
                        border-bottom: 1px solid transparent;
                        border-right: 1px solid transparent;
                        transform: rotate(180deg);
                    }
                    &::after {
                        position: absolute;
                        top: calc(100% - 3px);
                        right: -3px;
                        content: '';
                        width: 10px;
                        height: 10px;
                        border-top: 3px solid ${(props: ThemedProps) => props.theme.color.background.primary};
                        border-left: 3px solid ${(props: ThemedProps) => props.theme.color.background.primary};
                        border-top-left-radius: 50%;
                        border-bottom: 1px solid transparent;
                        border-right: 1px solid transparent;
                        transform: rotate(90deg);
                    }
                }
            }
        }
    }
`;
