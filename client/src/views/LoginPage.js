import {
    Alert,
    Avatar,
    Button,
    Container,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import {createTheme, styled} from "@mui/material/styles";
import {Box, ThemeProvider} from "@mui/system";
import React, {useState} from "react";
import {Link} from "react-router-dom";

import {EmailOutlined, LockOutlined} from "@mui/icons-material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import {GradientLargeTitle} from "../components/GradientLargeTitle";

const Title = styled(Typography)(({theme}) => ({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    animate: "gradient 5s ease-in-out infinite",
    ...theme.typography.h1,
    WebkitTextFillColor: "transparent",
    color: "transparent",
    fontSize: "3.25rem",
    fontWeight: "700",
    textShadow: `2px 2px 0 ${theme.palette.text.primary}`,
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
        fontSize: "2rem",
    },
}));

const GradientButton = styled(Button)(() => ({
    background: "linear-gradient(130deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: "30px",
    animate: "gradient 5s ease-in-out infinite",

    width: (props) => props.text.length * 10 + 30,

    boxShadow: `1px 1px 0 rgba(0, 0, 0, 0.5)`,
    color: "white",
    fontWeight: "bold",
    padding: "10px 30px",
    "&:hover": {
        boxShadow: `2.5px 2.5px 0 rgba(0, 0, 0, 0.5)`,
    },
}));


const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: "#F7F9FA",
                    borderRadius: "4px",
                    "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff6991",
                        },
                        "& .MuiInputLabel-root, .MuiInputAdornment-root .MuiSvgIcon-root": {
                            color: "#ff6991",
                            fontWeight: "600",
                        },
                    },
                    "& .MuiOutlinedInput-root": {
                        "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ff6991",
                            },
                            "& .MuiInputLabel-root, .MuiInputAdornment-root .MuiSvgIcon-root": {
                                color: "#ff6991",
                                fontWeight: "600",
                            },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#FFC0CB",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#FFC0CB",
                            fontWeight: "normal",
                            "&:hover": {
                                color: "#ff6991",
                                fontWeight: "600",
                            },
                        },
                        "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                            color: "#FFC0CB",
                        },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "2px",
                            borderColor: "#ff6991",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#ff6991",
                            fontWeight: "600",
                        },
                        "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                            color: "#ff6991",
                            fontWeight: "600",
                        },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#ff6991",
                        fontWeight: "600",
                    },
                },
            },
        },
    },
});
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [user, setUser] = useState();

    const handleVisible = () => {
        setVisible(!visible);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const PageName = "Log in to NewsFlash";
    const ColorGradient = "#FE6B8B 30%, #FF8E53 90%";

    const handleLinkClick = (event) => {
        event.preventDefault();
        // redirect the user to the signup page
        window.location.href = "/signup";
    };


    const handleLogin = async (email, password) => {
        const user = {email, password}
        try {
            setSubmitted(true);
            const response = await axios.post("http://localhost:3001/auth/login", {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                // redirect the user to the home page
                //setUser(response.data.user);
                console.log(response.data.user)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                const currentUser = JSON.parse(localStorage.getItem("user"));
                localStorage.setItem("token", response.data.token);
                console.log(currentUser)
                window.location.href = "/home";
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                setDisplayError(true);
            }


        }
    };

    return (
        <div>
            {displayError && (
                <Alert variant="filled" severity="error" sx={{
                    backgroundColor: "#ff8a8a",
                    color: "white",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    padding: "20px"
                }}>
                    The email or password you entered is incorrect.
                </Alert>
            )}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "100vh",
                    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    animation: "gradient 5s ease-in-out infinite",
                    "@keyframes gradient": {
                        "0%": {backgroundPosition: "0% 50%"},
                        "50%": {backgroundPosition: "100% 50%"},
                        "100%": {backgroundPosition: "0% 50%"},
                    },
                }}
            >
                <Container maxWidth="xs" sx={{
                    border: '1px solid #dbdbdb',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                    p: 4,
                    my: 8,
                }}>
                    <Avatar
                        sx={{
                            m: 3,
                            bgcolor: "#FE4C7C",
                            padding: "10px",
                            borderRadius: "75%",
                            background: "linear-gradient(45deg, #FF5F6D 30%, #FFE66D 80%)",
                            animation: "gradient 2s ease-in-out infinite",
                            marginTop: "40px",
                            scale: "1.5",
                            "@keyframes gradient": {
                                "0%": {backgroundPosition: "0% 50%"},
                                "50%": {backgroundPosition: "100% 50%"},
                                "100%": {backgroundPosition: "0% 50%"},
                            },
                        }}
                    >
                        <LockOutlined/>
                    </Avatar>


                    <GradientLargeTitle
                        title={PageName}
                        gradient={ColorGradient}
                        deg={45}
                    />


                    <LoginInputField handleLogin={handleLogin}/>


                    <Divider sx={{my: 2, width: "80%"}}/>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{
                        padding: '10px',
                        marginBottom: '20px',
                        color: '#8e8e8e',
                        '& a': {
                            color: '#ff5f6d',
                            fontWeight: '600',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                    }}>
                        Don't have an account?{' '}
                        <Link href="/signup" onClick={handleLinkClick}>
                            Sign Up
                        </Link>
                    </Typography>
                </Container>
            </Box>
        </div>

    );
}

const LoginInputField = ({handleLogin}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, password);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{width: "100%"}}>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlined/>
                                    </InputAdornment>
                                ),
                            }}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? (
                                                <VisibilityIcon/>
                                            ) : (
                                                <VisibilityOffIcon/>
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormControl>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <GradientButton
                            text="Log In"
                            variant="contained"
                            sx={{my: 2}}
                            type="submit"
                        >
                            Log In
                        </GradientButton>
                    </Box>
                </form>
            </Box>
        </ThemeProvider>
    );
};

