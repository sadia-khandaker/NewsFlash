import {InputAdornment, TextField} from "@mui/material";
import React from "react";

export const getInputAdornmentStyles = (borderColor) => ({
    position: 'start', sx: {
        ' .MuiOutlinedInput-root:hover &': {
            color: borderColor,
        }, ' .MuiOutlinedInput-root.Mui-focused &': {
            color: borderColor,
        },
    }
})
export const getFormControlSX = (color) => ({
    mb: 2, marginRight: 1, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: color, borderWidth: '2px',
    }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-input': {
        color: color,
    }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-startAdornment': {
        color: color,
    }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px', borderColor: color,
    }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
        color: color,
    }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-startAdornment': {
        color: color,
    }, '& label.Mui-focused': {
        color: color,
    }, '&:hover': {
        '& label': {
            color: color,
        }
    },
});

export function OneIconTextField({name, label, value, onChange, error, helperText, fieldColor, icon}) {

    const borderColor = fieldColor;
    return (<TextField
        id={name}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        variant="outlined"
        fullWidth
        InputProps={{
            startAdornment: (<InputAdornment {...getInputAdornmentStyles(borderColor)}
            >
                {icon}
            </InputAdornment>),
        }}

        sx={{
            mb: 2, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: borderColor, borderWidth: '2px',
            }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-input': {
                color: borderColor,
            }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-startAdornment': {
                color: borderColor,
            }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px', borderColor: borderColor,
            }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
                color: borderColor,

            }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-startAdornment': {
                color: borderColor,
            }, '& label': {
                // default label doesn't need to be changed
            }, ' .MuiOutlinedInput-root:hover &': {
                color: borderColor,
            }, ' .MuiOutlinedInput-root.Mui-focused &': {
                color: borderColor,
            },

            '& label.Mui-focused': {
                color: borderColor,

            },

            '&:hover': {
                '& label': {
                    color: borderColor,
                }
            },
        }}
    />);
}