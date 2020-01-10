import styled from 'styled-components';

export const LoginPageStyledLinksSection = styled.div`
    width: 100%;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
    a.register {
        text-decoration: none;
        color: ${(props) => props.theme.color.font.blue};
        font-size: ${(props) => props.theme.font.size.submedium};
    }
`;