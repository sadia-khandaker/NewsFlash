import {Typography} from "@mui/material";
import React from "react";

export const GradientLargeTitle = ({title, gradient, deg}) => {
    const styles = {
        background: `linear-gradient(${deg}deg, ${gradient})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '700',
        fontSize: '3rem',
        animation: 'gradient 5s ease-in-out infinite',
        '@keyframes gradient': {
            '0%': {backgroundPosition: '0% 50%'},
            '50%': {backgroundPosition: '100% 50%'},
            '100%': {backgroundPosition: '0% 50%'},
        },
        padding: '0 1rem',

    };

    return (
        <Typography variant="h3" sx={{my: 5, ...styles}}>
            {title}
        </Typography>
    );
};

