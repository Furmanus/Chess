import {DefaultTheme} from 'styled-components';

export type StyledProps<P = {}> = P & {theme: DefaultTheme};
export type FontSize = 'subsmall' | 'small' | 'submedium' | 'medium' | 'large';
