import styled from 'styled-components';

export const AppPageStyledUserListWrapper = styled.div`
    float: right;
    width: 25%;
    height: 100%;
    border-radius: 12px;
    box-shadow: 0 0 ${(props) => props.theme.boxShadowBlur.thin};
    background: ${(props) => props.theme.color.background.secondary};
`;
