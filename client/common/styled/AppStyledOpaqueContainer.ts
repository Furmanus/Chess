import styled from 'styled-components';

interface AppStyledOpaqueContainerProps {
    opacity: number;
}

export const AppStyledOpaqueContainer = styled.div<AppStyledOpaqueContainerProps>`
    opacity: ${(props) => props.opacity};
`;
