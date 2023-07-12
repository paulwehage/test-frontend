import { styled } from "@stitches/react";
import { Button, Typography } from "@mui/material";

export const LanguageSwitcher = styled('div', {

    '.selected-language': {
        width: '2rem',
        height: 'auto',
        border: 'none'
    },

    '.MuiSelect-select': {
        'span': {
            display: 'none'
        },
        'img': {
            width: '2rem',
            height: 'auto'
        },
        padding: '0 !important',
        appearance: 'none',
    },
    'svg': {
        display: 'none',
    },

    'fieldset': {
        border: 'none',
    },
});

export const LanguageOption = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    'img': {
        width: '2rem',
        height: 'auto',

    },
    'span': {
        padding: '0 1.5rem',
    }
})