import styled from 'styled-components';

export const LoginPageStyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    color: ${(props) => props.theme.color.font.secondary};
`;