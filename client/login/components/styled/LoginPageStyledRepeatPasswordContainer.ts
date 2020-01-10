import styled from 'styled-components';

interface IContainerProps {
    readonly isVisible: boolean;
}

export const LoginPageStyledRepeatPasswordContainer = styled.div<IContainerProps>`
    width: 100%;
    max-height: ${(props) => props.isVisible ? '56px' : '0'};
    overflow: hidden;
    margin-bottom: ${(props) => props.isVisible ? '12px' : '0'};
    transition: max-height 0.3s ease-in-out;
`;
