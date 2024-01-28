import React, {useEffect, useState} from "react";
import {Button, Divider, Typography} from "@mui/material";
import {createTheme} from '@mui/material/styles';
import {Link} from "react-router-dom";
import {EmailOutlined} from '@mui/icons-material';
import {LandingPageTitle} from "../components/LandingPageTitle";


const theme = createTheme({
    palette: {
        primary: {
            main: "#FF6AD5",
            light: "#C774E8",
            dark: "#AD8CFF",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#94D0FF",
            light: "#8CEBFF",
            dark: "#8795E8",
            contrastText: "#000000",
        },
        error: {
            main: "#FF949D",
            light: "#ff6a9b",
            dark: "#FF6AD5",
            contrastText: "#FFFFFF",
        },
        warning: {
            main: "#F9A41A",
            light: "#FFE768",
            dark: "#FFB800",
            contrastText: "#000000",
        },
        info: {
            main: "#8CEBFF",
            light: "#94D0FF",
            dark: "#8795E8",
            contrastText: "#000000",
        },
        success: {
            main: "#5CB85C",
            light: "#8BC34A",
            dark: "#4CAF50",
            contrastText: "#FFFFFF",
        },
        text: {
            primary: "#000000",
            secondary: "#555555",
            disabled: "#CCCCCC",
            hint: "#999999",
        },
        background: {
            paper: "#FFFFFF",
            default: "#F5F5F5",
        },
        action: {
            active: '#14171A',
            hover: 'rgba(0, 0, 0, 0.04)',
            hoverOpacity: 0.04,
            selected: 'rgba(0, 0, 0, 0.08)',
            selectedOpacity: 0.08,
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
            disabledOpacity: 0.38,
            focus: 'rgba(0, 0, 0, 0.12)',
            focusOpacity: 0.12,
            activatedOpacity: 0.12,
        },

        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "14px",
                        lineHeight: "16px",
                        padding: "6px 16px",
                        color: "#FFFFFF",
                    },
                    containedPrimary: {
                        backgroundColor: "#FF6AD5",
                        "&:hover": {
                            backgroundColor: "#C774E8",
                        },
                    },
                    containedSecondary: {
                        backgroundColor: "#94D0FF",
                        "&:hover": {
                            backgroundColor: "#8CEBFF",
                        },
                    },
                    containedError: {
                        backgroundColor: "#FF949D",
                        "&:hover": {
                            backgroundColor: "#ff6a9b",
                        },
                    },
                    containedWarning: {
                        backgroundColor: "#F9A41A",
                        "&:hover": {
                            backgroundColor: "#FFE768",
                        },
                    },
                    containedInfo: {
                        backgroundColor: "#8CEBFF",
                        "&:hover": {
                            backgroundColor: "#94D0FF",
                        },
                    },
                    containedSuccess: {
                        backgroundColor: "#5CB85C",
                        "&:hover": {
                            backgroundColor: "#8BC34A",
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#CCCCCC",
                            },
                            "&:hover fieldset": {
                                borderColor: "#AAAAAA",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#FF6AD5",
                            },
                        },
                    },
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: "#60b6ea",
                        "&:hover": {
                            color: "#60b6ea",
                            textDecoration: "underline",
                        },
                    },
                },
                MuiDivider: {
                    styleOverrides: {
                        root: {
                            backgroundColor: "#CCCCCC",
                        },
                    },
                },
            },
        },
    },
});


/**
 * This is a custom button with an icon and text
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ButtonWithIcon(props) {
    const {icon, text, onClick} = props;
    return (
        <Button
            variant={"contained"}
            color={"primary"}
            style={{
                marginTop: "20px",
                width: `${text.length * 10 + 40}px`,
                padding: `${text.length * 0.5 + 5}px`,
                borderRadius: "30px",
                fontSize: "1rem",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 2px #000000",
                background: "linear-gradient(45deg, #fc5c7d, #6a82fb)",
                animation: "gradient 10s ease-in-out infinite",
                textTransform: "none",

            }}
            onClick={onClick}
            startIcon={icon}
        >
            {text}
        </Button>
    );


}


/**
 * This component handles the elements in the white box
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function BoxRow(props) {
    const {children} = props;
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            padding: "20px",
        }}>
            {children}
        </div>
    );
}


/**
 * This component is used to create a text with a link. The link is passed in as a prop. The text is passed in as a prop.
 * @param props - text and link
 * @returns {JSX.Element} - text with link
 * @constructor
 */
function TextWithLink(props) {
    const {text, link} = props;
    return (
        <div>
            <Typography variant="body1" style={{
                color: "black",
                fontWeight: "lighter",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "30px",
                fontSize: "1.0rem",
                lineHeight: "1.2"
            }}>
                <span style={{color: "black", fontWeight: "bold"}}>{text}</span> {link}
            </Typography>
        </div>

    );

}


/**
 * This is the landing page component. It is the first page that the user sees when they go to the website.
 * @returns {JSX.Element}
 * @constructor
 */
export default function LandingPage() {

    const [buttonClicked, setButtonClicked] = useState(false); // if button has been clicked go to sign up page
    const [linkClicked, setLinkClicked] = useState(false); // if user clicks on the link, go to login page

    // if button is clicked, go to sign up page
    useEffect(() => {
            if (buttonClicked) {
                window.location.href = "/signup";
            }
        }
        , [buttonClicked]);

    // if link is clicked, go to login page
    useEffect(() => {
            if (linkClicked) {
                window.location.href = "/login";
            }
        }
        , [linkClicked]);


    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                background: "linear-gradient(45deg, #FF949D, #ff6a9b, #FF6AD5, #C774E8, #AD8CFF, #8795E8, #94D0FF, #8CEBFF)",
                animation: "gradient 10s ease-in-out infinite",
                zIndex: "-1",
            }}>
                <div style={{
                    background: "white",
                    borderRadius: "25px",
                    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                    maxWidth: "600px",
                    maxHeight: "700px",
                    margin: "auto",
                    marginTop: "20px",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        height: "100%",
                        padding: "20px",
                    }}>
                        <LandingPageTitle/>
                        <ButtonWithIcon text="Sign up with email" icon={<EmailOutlined/>}
                                        onClick={() => setButtonClicked(true)}/>
                        <Divider style={{width: "60%", padding: "10px", marginTop: "10px", marginBottom: "10px"}}/>
                        <TextWithLink text="Already have an account?" link={<Link to="/login">Log in</Link>}
                                      onClick={() => setLinkClicked(true)}/>
                    </div>
                </div>
            </div>
        </div>
    );


}








