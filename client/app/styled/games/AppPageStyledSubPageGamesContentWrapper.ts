import styled from 'styled-components';

interface ComponentProps {
    opaque?: boolean;
}
// TODO poprawic typowanie propsow
export const AppPageStyledSubPageGamesContentWrapper = styled.div<ComponentProps>`
    position: relative;
    height: 85%;
    max-width: 100%;
    padding: 10px;
    overflow-y: auto;
    margin: auto;
    opacity: ${(props: any) => props.opaque ? 0.5 : 1};
`;
