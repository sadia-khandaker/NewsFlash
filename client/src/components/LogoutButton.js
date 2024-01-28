import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";
import React from "react";

export function LogoutButton(props) {
    return <div
        className="flex items-center space-x-2 p-4 cursor-pointer group flex-row">
        <button
            // on click logout, and redirect to login page
            onClick={props.onClick}
            className="flex items-center justify-center w-3/4 mx-auto text-white bg-gradient-to-r from-pink-400 through-purple-400 to-blue-400 rounded-full focus:outline-none  transition duration-400 ease-in-out
                      px-4 py-2 hover: from-pink-500 hover:through-purple-500 hover:to-blue-500 mt-10">
            <span className="ml-2 text-white font-bold text-lg px-2">Logout</span>

            <ArrowRightOnRectangleIcon className="w-5 h-5 ml-2 text-white"/>

        </button>
    </div>;
}