import React from "react";

function SidebarRow({Icon, title}) {
    return (
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-100 rounded-full cursor-pointer group flex-row">
            <Icon
                className="h-8 w-8 text-black stroke-1.15 scale-110 group-hover:scale-125 rounded-full active:scale-100 mt-1.5 ml-1.5 mr-1.5 mb-1.5 group-hover:text-purple-400"/>
            <p className="hidden md:inline-flex group-hover:text-purple-400 font-medium text-2xl group-hover:font-bold">{title}</p>
        </div>);
}

export default SidebarRow;


