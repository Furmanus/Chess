import styled, {ThemedStyledProps} from 'styled-components';
import {ITheme} from '../../../common/theme/theme';

type ThemedProps = ThemedStyledProps<void, ITheme>;

export const AppPageStyledSubPageHeading = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    height: 15%;
    border-bottom: 1px solid ${(props: ThemedProps) => props.theme.border.color.black};
    padding: 5px 25px;
`;
