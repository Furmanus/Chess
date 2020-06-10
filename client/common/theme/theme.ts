import {DefaultTheme} from 'styled-components';

export const theme: DefaultTheme = {
    color: {
        background: {
            primary: '#f2f4f7',
            secondary: '#ffffff',
            red: '#dc004e',
            blue: '#1976d2',
            darkblue: '#115293',
            navigation: '#4b0082',
            darkgray: '#696969',
            cellLight: '#fae0c7',
            cellDark: '#bf7e44',
            tableBorder: '#8B4513',
        },
        font: {
            primary: '#101010',
            secondary: '#a9a9a9',
            white: '#ffffff',
            blue: '#1976d2',
            error: '#ff0000',
        },
        svg: {
            white: '#ffffff',
        },
    },
    font: {
        size: {
            subsmall: '10px',
            small: '12px',
            submedium: '14px',
            medium: '16px',
            large: '20px',
        },
        weight: {
            bold: '700',
        },
    },
    border: {
        color: {
            blue: '#1976d2',
            gray: '#d0d0d0',
            black: '#000000',
            error: '#ff0000',
            cellWithMove: '#0000ff',
        },
    },
    boxShadowBlur: {
        veryThick: '18px',
        thick: '14px',
        medium: '10px',
        thin: '6px',
        veryThin: '3px',
    },
};

