import styled from 'styled-components';

export const LoginPageStyledIconContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    background: ${(props) => props.theme.color.background.red};
    
    svg {
        fill: ${(props) => props.theme.color.svg.white};
    }
`;