import React from 'react'
import {AdjustmentsHorizontalIcon, BellIcon, HomeIcon, UserIcon,} from '@heroicons/react/24/outline'
import SidebarRow from "./SidebarRow";

import {NavLink} from "react-router-dom";
import {GradientLargeTitle} from "./GradientLargeTitle";
import * as PropTypes from "prop-types";
import {LogoutButton} from "./LogoutButton";

LogoutButton.propTypes = {onClick: PropTypes.func};

function Sidebar() {
    return (

        <div className="flex flex-col bg-white p-4  w-1/5 bg-auto z-3 h-screen fixed top-0 left-0 overflow-y-scroll ">
            <GradientLargeTitle title="NewsFlash"
                                deg={-45}
                                gradient={["#12c2e9", "#c471ed", "#f64f59"]}/>
            <NavLink to="/home">
                <SidebarRow Icon={HomeIcon}
                            title="Home"/>
            </NavLink>

            <NavLink to={"/notifications"}>
                <SidebarRow Icon={BellIcon}
                            title="Notifications"/>
            </NavLink>

            <NavLink to={"/profile"}>
                <SidebarRow Icon={UserIcon}
                            title="Profile"/>
            </NavLink>

            <NavLink to={"/settings"}>
                <SidebarRow Icon={AdjustmentsHorizontalIcon}
                            title="Settings"/>
            </NavLink>

            <LogoutButton onClick={() => {
                // get the current user and logout
                if (window.confirm("Are you sure you want to logout?")) {
                    // Clean up the local storage
                    localStorage.clear();
                    // see if user is truly logged out
                    if (localStorage.getItem("user") === null) {
                        console.log("User logged out successfully");
                    }
                    window.location.href = "/login";
                }
            }}/>

        </div>);

}


export default Sidebar;