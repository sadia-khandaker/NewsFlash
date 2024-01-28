import React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';

const GradientButton = styled(Button)(({theme, degree, gradientColors}) => ({
    background: `linear-gradient(${degree}, ${gradientColors.join(',')})`,
    borderRadius: '30px',
    variant: 'contained',
    animate: 'gradient 5s ease-in-out infinite',
    width: (props) => props.text.length * 10 + 30,
    boxShadow: `1px 1px 0 rgba(0, 0, 0, 0.1)`,
    color: 'white',
    fontWeight: 'bold',
    padding: '10px 30px',
    '&:hover': {
        boxShadow: `2px 2px 0 rgba(0, 0, 0, 0.1)`,
    },
    '@keyframes gradient': {
        '0%': {
            backgroundPosition: '0% 50%'
        },
        '50%': {
            backgroundPosition: '100% 50%'
        },
        '100%': {
            backgroundPosition: '0% 50%'
        }
    }
}));
export default GradientButton;

