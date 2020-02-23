import styled from 'styled-components';

export const AppPageStyledGameBrickWrapper = styled.div`
    padding: 10px;
    width: 250px;
    height: 300px;
    border: 1px dashed ${(props) => props.theme.border.color.black};
    margin: 15px;
    border-radius: 8px;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: ${(props) => props.theme.font.size.small};
    
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
