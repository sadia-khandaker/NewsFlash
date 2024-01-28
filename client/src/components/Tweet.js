// Tweet component that is used to display a single tweet in the feed and in the profile page
import React from "react";
import DefaultProfilePic from "../images/default_profile.png";


function Tweet({tweet}) {

    return (<div className="flex flex-col border-b border-gray-200">
        <div className="flex items-center p-4">
            <img
                className="w-12 h-12 rounded-full mr-4"
                src={DefaultProfilePic}
                alt="Profile Pic"
            />
            <div>
                <h1 className="font-bold text-gray-900">{tweet.user.name}</h1>
                <h2 className="text-gray-600 text-sm">{tweet.user.handle}</h2>
            </div>
        </div>
        <div className="px-4 pb-4">
            <p className="text-gray-900 text-sm">{tweet.content}</p>
        </div>
    </div>);
}