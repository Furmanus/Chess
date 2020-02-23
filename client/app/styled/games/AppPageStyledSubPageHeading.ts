import styled from 'styled-components';

export const AppPageStyledSubPageHeading = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    height: 15%;
    border-bottom: 1px solid ${(props) => props.theme.border.color.black};
    padding: 5px 25px;
`;
