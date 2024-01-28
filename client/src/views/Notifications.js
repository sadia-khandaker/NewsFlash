//import use state
import React from 'react'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";


export const Notifications = (comments) => {

    const showToastMessageLikes = () => {

        const likes = [
            {
                name: "John Doe",
                type: "like"
            },
            {
                name: "Sam Smith",
                type: "like"
            },
            {
                name: "Katy Snow",
                type: "like"
            },
            {
                name: "Kevin Li",
                type: "like"
            },
            {
                name: "Jimmy Cooper",
                type: "like"
            },
        ];
        likes.forEach(likes => {
            toast.success(`${likes.name} liked your post`);
        })

    };

    const showToastMessageComments = () => {
        //comments
        const comments =
            [
                {
                    name: "John Smith",
                    type: "comment"
                },
                {
                    name: "Fin Cooper",
                    type: "comment"
                },
                {
                    name: "John Lee",
                    type: "comment"
                },
                {
                    name: "Kylie Jenner",
                    type: "comment"
                },
                {
                    name: "Bill Rose",
                    type: "comment"
                },
            ];

        comments.forEach(comments => {
            toast.info(`${comments.name} commented on your post`);
        })
    }


    return (
        <div className="mx-auto border-r border-gray-300 absolute inset-0 flex flex-col items-stretch">
            <Sidebar/>
            <div
                className="w-4/5 mx-auto border-lr border-r border-gray-300 fixed top-0 z-10 h-screen right-0 left-1/5 overflow-y-scroll">
                <PageHeader title="Notifications"/>

                <div
                    className="flex justify-center items-center flex-col border-b border-t border-gray-300 pt-4 bg-white opacity-95">
                    <div className="w-full h-screen bg-gradient-to-br from-red-300 via-pink-300 to-indigo-400">
                        <div
                            className="flex items-center space-x-2 p-4 hover:bg-gray-100 rounded-full cursor-pointer group flex-row">
                            <button onClick={showToastMessageLikes}>Likes</button>
                        </div>
                        <div
                            className="flex items-center space-x-2 p-4 hover:bg-gray-100 rounded-full cursor-pointer group flex-row">
                            <button onClick={showToastMessageComments}>Comments</button>
                        </div>
                        <div className="flex flex-col">
                            <ToastContainer/>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}


//sample likes and comments and 


export default Notifications;