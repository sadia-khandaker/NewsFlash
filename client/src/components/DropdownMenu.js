import React, {useEffect, useRef, useState} from "react";
import {EllipsisHorizontalIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import { Person2Outlined } from "@mui/icons-material";

export function DropdownMenu({post, handlePostEdit, handleDelete, handleProfile}) {
    const menuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleEditClick = () => {
        setIsOpen(false);
        handlePostEdit(post);
    };

    const handleProfileClick = () => {
        setIsOpen(false);
        handleProfile(post);
    };

    const handleDeleteClick = () => {
        setIsOpen(false);
        handleDelete(post);
    };

    const handleDocumentClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Add a document click event listener to close the menu when clicked outside
    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                className="flex items-center text-gray-400 hover:text-black focus:outline-none"
                onClick={handleButtonClick}
            >
                <EllipsisHorizontalIcon className="w-6 h-6"/>
            </button>
            {isOpen && (
                <div className="absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-200">
                    <button
                        onClick={handleEditClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 w-full text-left"
                    >
                        <PencilIcon className="w-5 h-5 mr-2"/>
                        Edit
                    </button>

                    <button
                        onClick={handleProfileClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 hover:text-red-500 w-full text-left"
                    >
                        <Person2Outlined className="w-5 h-5 mr-2"/>
                        View Profile
                    </button>

                    <button
                        onClick={handleDeleteClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 hover:text-red-500 w-full text-left"
                    >
                        <TrashIcon className="w-5 h-5 mr-2"/>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}