import styled from 'styled-components';

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
    box-shadow: 0 0 ${(props) => props.theme.boxShadowBlur.thin};
    font-size: ${(props) => props.theme.font.size.small};
    transition: 0.4s ease-in-out;
    
    &:hover {
        box-shadow: 0 0 ${(props) => props.theme.boxShadowBlur.veryThick};
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
