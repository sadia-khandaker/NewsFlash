/** SETTINGS OPTION TABLE REFERENCED FROM: https://www.youtube.com/watch?v=iziROE2Z7TY&ab_channel=CryceTruly */
import React, {useEffect, useState} from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {Avatar, Button, Typography,} from "@mui/material";
import {ChevronRight, SettingsOutlined,} from "@mui/icons-material";
import {MagnifyingGlassIcon,} from "@heroicons/react/24/outline";
import Settings, {Logout} from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import GradientButton from "../components/GradientButton";
import {OneIconTextField} from "../components/OneIconTextField";
import {FirstLastNameFields} from "../components/FirstLastNameFields";
import {PasswordTextField} from "../components/ShowPassword";

const PageName = "Settings";

/** Logout button component */
function LogoutButton(props) {
    const {icon, text, onClick} = props;
    return (
        <Button
            variant={"contained"}
            startIcon={icon}
            onClick={onClick}
            sx={{
                marginTop: "15px",
                background: "#fa5f5f",
                animation: "gradient 10s ease-in-out infinite",
                textTransform: "none",
                borderRadius: "30px",

                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                padding: "10px 20px",

                ":hover": {
                    background: "#fc2b2b",
                },
            }}
        >
            {text}
        </Button>
    );
}

/** Back Button Layout Component
 * @param icon The icon from MUI
 * @param text What the button should say
 * @param onClick Where to go if the button is clicked on
 */
function BackButton(props) {
    // // const BackButton = ({ text, onClick }) => {
    // //     return (
    // //         <button
    // //
    // //             className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
    // //             onClick={onClick}
    // //         >
    // //             <ArrowLeftIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
    // //             <span>{text}</span>
    // //         </button>
    // //     );
    // // };
    const {icon, text, onClick} = props;

    return (
        <Button
            variant={"contained"}
            color={"primary"}
            sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "400px",
                marginTop: "20px",
                width: `${text.length * 10 + 40}px`,
                padding: `${text.length * 0.5 + 5}px`,
                borderRadius: "10px",
                fontFamily: "Trebuchet MS",
                fontSize: "1rem",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                color: "white",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #C774E8, #AD8CFF, #8795E8, #94D0FF, #8CEBFF)",
                animation: "gradient 10s ease-in-out infinite",
                textTransform: "none",
                ":hover": {
                    background: "linear-gradient(45deg, #FF949D, #ff6a9b, #FF6AD5, #C774E8)",
                },
            }}
            /**  Fill the {} with the Props defined above */
            onClick={onClick}
            startIcon={icon}
        >
            {text}
        </Button>
    );
}

// const BackButton = ({ text, onClick }) => {
//     return (
//         <button
//
//             className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
//             onClick={onClick}
//         >
//             <ArrowLeftIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
//             <span>{text}</span>
//         </button>
//     );
// };

function SettingButton(props) {
    const {icon, onClick} = props;
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{
                display: "flex",
                borderRadius: "10px",
                fontFamily: "Trebuchet MS",
                fontSize: "1rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #C774E8, #AD8CFF, #8795E8, #94D0FF, #8CEBFF)",
                textTransform: "none",
                position: "relative",
                "&::before": {
                    content: '""',
                    alignItems: "center",
                    transform: "translate(-50%, -50%)",

                    width: "0",
                    height: "0",
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                },
                ":hover": {
                    background: "linear-gradient(45deg, #FF949D, #ff6a9b, #FF6AD5, #C774E8)",
                    boxShadow: "0 0 10px 0 rgba(255, 65, 108, 1)",
                },
            }}
            startIcon={icon}
            onClick={onClick}
        ></Button>
    );
}

/** OPTIONS AVAILABLE IN THE APPLICATION. Each value is a header, value pair.
 * THESE ARE GONNA BE DYAMICALLY RENDERED ONCE WE RENDER THEIR COMPONENTS.
 */
const options = [
    {
        header: {name: "Account"},
        values: [
            {
                name: "Profile",
                description: "Edit your profile information",
                tags: ["username", "display name", "bio", "profile picture"],
            },
            {
                name: "Login Settings",
                description: "Edit your login credentials",
                tags: ["email", "password"],
            },
            {
                name: "Danger Zone",
                description:
                    "Delete or temporarily deactivate your account, handle with care!",
                tags: ["delete account", "deactivate account temporarily"],
            },
        ],
    },

    {
        header: {name: "Privacy"},
        values: [
            {
                name: "Anonymity Settings",
                description:
                    "Choose whether or not your posts are anonymous by default",
                tags: ["Default Flash Visibility"],
            },
            {
                name: "Blocked Users",
                description: "Manage your blocked users",
                tags: [],
            },
        ],
    },
];

/** THE MAIN AREA WHERE ALL COMPONENTS ARE DEFINED AND RENDERED. */
export default function SettingsPage() {
    //Take the user back to the previous visited page if they hit back button.
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    //TAKE USER BACK TO LOGIN PAGE IF THEY SELECT LOGOUT:
    const [logoutButtonClicked, setLogOutClick] = useState(false);
    useEffect(() => {
        if (logoutButtonClicked) {
            window.location.href = "/login";
        }
    }, [logoutButtonClicked]);

    const [visibleOptions, setVisibleOptions] = useState(options);

    const onChange = (e) => {
        const searchQuery = e.target.value.trim().toLowerCase();

        if (searchQuery === "") {
            setVisibleOptions(options);
            return;
        }

        const returnedItems = options.map((option) => {
            const foundOptions = option.values.filter((item) => {
                const {name, description, tags} = item;
                const loweredSearchQuery = searchQuery.toLowerCase();
                const isNameMatch = name.toLowerCase().includes(loweredSearchQuery);
                const isDescriptionMatch = description
                    .toLowerCase()
                    .includes(loweredSearchQuery);
                const isTagMatch = tags.some((tag) =>
                    tag.toLowerCase().includes(loweredSearchQuery)
                );
                return isNameMatch || isDescriptionMatch || isTagMatch;
            });
            return {header: option.header, values: foundOptions};
        });

        setVisibleOptions(returnedItems);
    };

    /** BELOW IS WHERE WE RENDER ALL THE COMPONENTS WE CREATE ABOVE.*/
    return (
        <div>
            {/** RENDERS THE COLORED BACKGROUND */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "160vh",
                    background:
                        "linear-gradient(45deg, #FF949D, #ff6a9b, #FF6AD5, #C774E8, #AD8CFF, #8795E8, #94D0FF, #8CEBFF)",
                    animation: "gradient 10s ease-in-out infinite",
                    zIndex: "-1",
                }}
            >
                {/** RENDERS THE WHITE CONTAINER */}
                <div
                    style={{
                        background: "white",
                        borderRadius: "25px",
                        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                        maxWidth: "1000px",
                        maxHeight: "2000px",
                        margin: "auto",
                        marginTop: "20px",
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            height: "100%",
                            padding: "40px",
                        }}
                    >
                        {/** ALL COMPONENTS RENDERED BELOW WILL BE IN THE WHITE BACKGROUND BOX */}
                        {/** SETTINGS PAGE BACK BUTTON */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <BackButton
                                icon=<span>&lt;</span>
                            text="Back"
                            onClick={goBack}
                            >
                        </BackButton>
                        {/** Avatar =  Circular Image */}
                        <Avatar
                            sx={{
                                m: 5,
                                translate: "-241px",
                                bgcolor: "#fe6b8b",
                                padding: "40px",
                                borderRadius: "75%",
                                background:
                                    "linear-gradient(45deg, #FF6AD5, #C774E8, #AD8CFF, #8795E8)",
                                animation: "gradient 5s ease-in-out infinite",
                                marginTop: "40px",
                                scale: "1.5",
                                /** Animates the gear icon to spin around. */
                                "@keyframes gradient": {
                                    "0%": {backgroundPosition: "0% 50%"},
                                    "50%": {backgroundPosition: "100% 50%"},
                                    "100%": {backgroundPosition: "0% 50%"},
                                },
                            }}
                        >
                            {/** Settings Outlined = the gear icon */}
                            <SettingsOutlined
                                sx={{
                                    animation: "spin 3s infinite linear",
                                    "@keyframes spin": {
                                        "0%": {transform: "rotate(0deg)"},
                                        "100%": {transform: "rotate(360deg)"},
                                    },
                                }}
                            />
                        </Avatar>
                    </div>
                    {/** Typography =  TEXT OF THE PAGE TITLE */}
                    <Typography
                        variant="h3"
                        sx={{
                            my: 5,
                            background: "linear-gradient(45deg, #C774E8, #AD8CFF, #8795E8, #94D0FF, #8CEBFF)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontFamily: "Trebuchet MS",
                            fontWeight: "700",
                            fontSize: "3rem",
                            animation: "gradient 5s ease-in-out infinite",
                            padding: "20px",
                            marginTop: "-10px",
                            marginBottom: "15px",
                        }}
                    >
                        {PageName}
                    </Typography>

                    {/** SEARCH BAR */}
                    <div className="relative flex items-center w-full max-w-3xl">
                        <input
                            type="text"
                            className="w-full px-4 py-2 pl-10 text-lg text-gray-900 placeholder-gray-500 border border-transparent focus:outline-none
focus:ring-2 focus:ring-blue-400 rounded-full bg-gray-100
focus:bg-white focus:placeholder-gray-400 inline-flex"
                            placeholder="Search options..."
                            onChange={onChange}
                        />
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3"/>
                    </div>
                    {/* DISPLAY OPTIONS LIST */}
                    <div className="OptionHeaders w-full max-w-3xl">
                        {visibleOptions.map((option) => (
                            <div key={option.header.name} className="mt-5">
                                <div className="bg-white rounded-lg p-4">
                                    <h3 className="text-xl font-medium">
                                        {option.header.name}
                                    </h3>

                                    <div className="">
                                        {option.values.map((value) => (
                                            <div
                                                key={value.name}
                                                className="mt-2 p-2 border border-gray-300 rounded-lg flex items-center justify-between"
                                            >
                                                <div>
                                                    <h6 className="font-medium">{value.name}</h6>
                                                    <p className="text-sm text-gray-500">
                                                        {value.description}
                                                    </p>
                                                </div>
                                                <SettingButton icon={<ChevronRight/>}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/** RENDERS OUT THE LOGOUT BUTTON AFTER THE LST OF OPTIONS */}
                    <LogoutButton
                        icon=<Logout/>
                    text="LOGOUT"
                    onClick={() => {
                    setLogOutClick(true);
                }}
                    />
                </div>
            </div>
        </div>
</div>
)

}
