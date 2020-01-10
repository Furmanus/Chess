import styled from 'styled-components';

export const LoginPageStyledSubmitButton = styled.button`
    width: 100%;
    height: 56px;
    border-radius: 5px;
    text-transform: uppercase;
    margin-top: 6px;
    font-weight: ${(props) => props.theme.font.weight.bold};
    font-size: ${(props) => props.theme.font.size.medium};
    color: ${(props) => props.theme.color.font.white};
    background-color: ${(props) => props.theme.color.background.blue};
    border: none;
    transition: all 0.3s ease-in-out;
    
    &:hover {
        background-color: ${(props) => props.theme.color.background.darkblue};
        cursor: pointer;
    }
`;