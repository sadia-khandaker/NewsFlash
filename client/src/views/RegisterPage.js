import React, {useState} from 'react';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import axios from 'axios';
import LockOutlined from '@mui/icons-material/LockOutlined';
import {Button, Container, Divider, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {PersonOutlined} from "@mui/icons-material";
import {Box} from "@mui/system";
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import LockIcon from '@mui/icons-material/Lock';
import GradientButton from "../components/GradientButton";
import {OneIconTextField} from "../components/OneIconTextField";
import {FirstLastNameFields} from "../components/FirstLastNameFields";
import {PasswordTextField} from "../components/ShowPassword";


const MyGradientButton = styled(Button)(({theme}) => ({

//(87deg, rgba(255,221,165,1) 6%, rgba(255,195,113,1) 18%, rgba(255,175,123,1) 34%, rgba(255,95,136,1) 74%, rgba(255,95,149,1) 97%);
    background: "linear-gradient(65deg, rgba(255,221,165,1) 6%, rgba(255,195,113,1) 18%, rgba(255,175,123,1) 34%, rgba(255,95,136,1) 74%, rgba(255,95,149,1) 97%)",
    animation: 'gradient 5s ease infinite',
    '@keyframes gradient': {
        '0%': {
            backgroundPosition: '0% 50%'
        }, '50%': {
            backgroundPosition: '100% 50%'
        }, '100%': {
            backgroundPosition: '0% 50%'

        }
    },

    animate: 'gradient 5s ease-in-out infinite',

    padding: '10px 30px',


    // make the white box features like twitter and make it slightly transparent
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '30px',


    // make the shadow color go with linear-gradient(to right, #fc5c7d, #6a82fb)
    boxShadow: `1px 1px 0 rgba(0, 0, 0, 0.5)`,
    color: 'white',
    fontWeight: 'bold',

    '&:hover': {
        boxShadow: `2.5px 2.5px 0 rgba(0, 0, 0, 0.5)`,
    },

}));


const initialValues = {
    first_name: "", last_name: "", username: "", email: "", password: "", confirm_password: "",

}


const RegisterPage = () => {
    const [focusedField, setFocusedField] = useState("");

    const handleFocus = (event) => {
        setFocusedField(event.target.name);
    };

    const handleBlur = () => {
        setFocusedField("");
    };


    const [showPassword, setShowPassword] = useState(false);
    const isFieldFocused = (fieldName) => {
        return fieldName === focusedField;
    };

    // Validate form using Yup and Formik
    const formValidation = Yup.object({
        first_name: Yup.string().required("Please enter your first name.").matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "The first name you entered is invalid").max(64, "First name is too long").min(2, "The first name you entered is too short."),
        last_name: Yup.string().required("Please enter your last name.").matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "The last name you entered is invalid").max(64, "Last name is too long").min(2, "The last name you entered is too short."),
        username: Yup.string().required("Please enter a username.").matches(/^[a-zA-Z0-9_-]{3,30}$/, "The username you entered is invalid").max(30, "Username is too long").min(3, "The username you entered is too short."), //name: Yup.string().required("Please enter your full name.").matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Name is invalid").max(64, "Name is too long").min(2, "The name you entered is too short."),
        email: Yup.string().email("Please enter a valid email address.").required("Please enter your email address.").max(64, "Email is too long").min(3, "The email you entered is too short.").matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/, "The email you entered is invalid."),
        password: Yup.string().min(6, "Your password must be at least 6 characters long.").required("Please enter a password with at least 6 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Weak password. Add symbols, numbers, capital letters, and lowercase letters."),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match.').required("Please confirm your password"),


    })


    const {touched, errors, handleSubmit, handleChange, values, isSubmitting} = useFormik({
        initialValues: initialValues,
        validationSchema: formValidation,
        onSubmit: async (values, {setSubmitting, resetForm}) => {
            setSubmitting(true); // This is to prevent the user from submitting the form multiple times
            console.log(values); // Console log the values to see if they are being passed correctly
            let response = axios.post("http://localhost:3001/auth/register", values).then(
                function (result) {
                    if (result.status === 200) {
                        localStorage.setItem("user", JSON.stringify(result.data.user));
                        const currentUser = JSON.parse(localStorage.getItem("user"));
                        console.log(currentUser);
                        window.location.href = "/home"

                    }
                }
            ).catch((err) => {
                if (err.res) {
                    console.log(err.res.data);
                }
            }); // Send the values to the backend
            //

        }
    });


    return (<Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        background: "linear-gradient(130deg, #ffdda5 5%, #ffc371 18%, #ffaf7b 42%, #ff5f88 90%)",
        animation: 'gradient 5s ease infinite',
        '@keyframes gradient': {
            '0%': {
                backgroundPosition: '0% 50%'
            }, '50%': {
                backgroundPosition: '100% 50%'
            }, '100%': {
                backgroundPosition: '0% 50%'

            }
        }
    }}>

        <Container
            maxWidth="sm"
            sx={{
                borderColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                borderRadius: "1rem",
                margin: "0 auto",
                padding: "2rem",
                background: "white",
                boxShadow: "0px 0px 1px 1px #bdbdbd",
            }}
        >


            <Typography variant="h5"
                        gutterBottom
                        sx={{
                            position: 'relative',
                            display: 'inline-block',
                            fontSize: '2.25rem',
                            fontWeight: '700',
                            lineHeight: '1.1',
                            letterSpacing: '-0.02em',
                            marginBlockStart: '0.67em',
                            marginBlockEnd: '0.67em',
                            background: 'linear-gradient(335deg, rgba(255,175,123,1) 9%, rgba(255,95,136,1) 88%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animate: 'gradient 5s ease-in-out infinite',
                            '@keyframes gradient': {
                                '0%': {
                                    backgroundPosition: '0% 50%',
                                }, '50%': {
                                    backgroundPosition: '100% 50%',
                                }, '100%': {
                                    backgroundPosition: '0% 50%',

                                }
                            },

                        }}>
                Create an account
            </Typography>


            <form onSubmit={handleSubmit}
                  style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'white',
                      width: '100%',
                      height: '100%',
                      borderRadius: '1rem',


                  }}>


                <FirstLastNameFields firstName={values.first_name}
                                     lastName={values.last_name}
                                     firstNameError={touched.first_name && Boolean(errors.first_name)}
                                     lastNameError={touched.last_name && Boolean(errors.last_name)}
                                     firstNameHelperText={touched.first_name && errors.first_name}
                                     lastNameHelperText={touched.last_name && errors.last_name}
                                     firstNameOnChange={handleChange}
                                     lastNameOnChange={handleChange}/>


                <OneIconTextField fieldColor={'#ff5f88'}
                                  name={"username"}
                                  label={"Username"}
                                  value={values.username}
                                  onChange={handleChange}
                                  error={touched.username && Boolean(errors.username)}
                                  helperText={touched.username && errors.username}
                                  icon={<PersonOutlined/>}
                />


                <OneIconTextField fieldColor={'#ff5f88'}
                                  name={"email"}
                                  label={"Email"}
                                  value={values.email}
                                  onChange={handleChange}
                                  error={touched.email && Boolean(errors.email)}
                                  helperText={touched.email && errors.email}
                                  icon={<EmailOutlined/>}


                />


                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <PasswordTextField
                        id="password"
                        label="Password"
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        icon={<LockOutlined/>}
                    />

                    <PasswordTextField
                        id="confirm_password"
                        label="Confirm Password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        error={touched.confirm_password && Boolean(errors.confirm_password)}
                        helperText={touched.confirm_password && errors.confirm_password}
                        icon={<LockIcon/>}
                    />
                </div>

                <GradientButton
                    degree="65deg"
                    gradientColors={['#ffdda5', '#ffc371', '#ffaf7b', '#ff5f88']}
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        lineHeight: '20px',
                        padding: '12px 24px',
                        ml: 2,
                        mr: 2,

                        mb: 2,
                        mt: 2,
                    }}
                >
                    Sign up
                </GradientButton>


            </form>


            <Divider sx={{
                mt: 1,
                mb: 1,
                width: '70%',
                mx: 'auto',
            }}/>


            <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{
                    padding: '10px',

                    color: '#8e8e8e',
                    '& a': {
                        color: '#ff8b6f',
                        fontWeight: '600',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },
                }}
            >
                Already have an account?{' '}
                <Link to="/login">
                    Log in
                </Link>
            </Typography>


        </Container>
    </Box>)
}

export default RegisterPage