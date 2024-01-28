import PersonIcon from '@mui/icons-material/Person';
import {ChatBubbleOvalLeftEllipsisIcon, HeartIcon} from "@heroicons/react/24/outline";
import {useRef, useState} from "react";
import {Delete} from "@mui/icons-material";
import {EllipsisHorizontalIcon, UserMinusIcon} from "@heroicons/react/20/solid";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import axios from "axios";

function PostHeader({profilePicture, name, username, time}) {
    const timestamp = new Date(time);
    const now = new Date();
    const diff = now - timestamp;

    let formattedTime;
    switch (true) {
        case (diff < 3600000): // if it is less than an hour ago, we want to show the minutes
            formattedTime = `${Math.floor(diff / 60000)}m`;
            break;
        case (diff < 86400000): // if it is less than a day ago, we want to show the hours
            formattedTime = `${Math.floor(diff / 3600000)}h`;
            break;
        case (diff < 604800000): // if it is less than a week ago, we want to show the days
            formattedTime = `${Math.floor(diff / 86400000)}d`;
            break;
        case (timestamp.getFullYear() === now.getFullYear()): // else we want to show the date in the format "Mar 1" for the same year
            formattedTime = `${timestamp.toLocaleString("default", {month: "short"})} ${timestamp.getDate()}`;
            break;
        default: // else we want to show the date in the format "Mar 1, 2020" for previous years
            formattedTime = `${timestamp.toLocaleString("default", {month: "short"})} ${timestamp.getDate()}, ${timestamp.getFullYear()}`;
    }

    return (<div
        className="flex items-center justify-between bg-white rounded-lg p-3 px-4 border border-gray-200 space-x-3 w-full">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={profilePicture} alt="profile picture"/>
            </div>
            <div>
                <h4 className="font-bold">{name}</h4>
                <span className="text-gray-500 text-sm flex items-center space-y-1">@{username}</span>
            </div>
        </div>
        <span className="text-gray-500 text-sm flex items-center space-y-1">{formattedTime}</span>
    </div>);
}


export function DisplayPosts({
                                 postId,
                                 userId,
                                 profilePicture,
                                 firstName,
                                 lastName,
                                 username,
                                 time,
                                 tweet,
                                 numberOfLikes,
                                 numberOfComments,
                             }) {

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(numberOfLikes || 0);
    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    }

    const name = firstName + " " + lastName;

    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [reply, setReply] = useState('');

    const handleCommentToggle = () => {
        if (replies.length !== 0) {
            setIsReplyOpen((prevState) => !prevState);
        }
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dropdownOptionsOtherUser = [{
        name: "View Tweet", icon: <VisibilityIcon className="h-6 w-6 text-gray-500 hover:text-gray-600"/>
    }, {name: 'View Profile', icon: <PersonIcon className="h-6 w-6 text-gray-500 hover:text-gray-600"/>}, {
        name: `Unfollow @${username}`, icon: <UserMinusIcon className="h-6 w-6 text-gray-500 hover:text-gray-600"/>
    }, {
        name: "Cancel", icon: <CancelIcon className="h-6 w-6"/>

    }];

    const dropdownOptionsCurrentUser = [{
        name: "Delete Post", icon: <Delete className="h-6 w-6 text-gray-500 hover:text-gray-600 "/>
    }, {name: 'Edit Post', icon: <DriveFileRenameOutlineIcon className="h-6 w-6 text-gray-500 hover:text-gray-600"/>}, {
        name: "Cancel", icon: <CancelIcon className="h-6 w-6"/>
    }];

    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const handleDropdownOptionClick = (option) => {
        if (option.name === "Cancel") {
            setIsDropdownOpen(false);
        }
    };

    const handleDropdownClick = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const [replies, setReplies] = useState([]);

    const onReplySubmit = async (event) => {
        event.preventDefault();

        const replyData = {
            postId: postId,
            userId: currentUser.userId,
            desc: reply,
            anonymousReply: false,
            likes: [],
            likesIncludingAnon: [],
            likesNum: 0,
            image: null,
            replies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            timestamps: true,
        };

        try {
            const response = await axios.post('http://localhost:3001/reply', replyData);
            const newReply = response.data;
            setReplies([...replies, newReply]);
            setReply('');
        } catch (error) {
            console.log(error);
        }
    };

    return (<div className="flex flex-col bg-white shadow  rounded-xl mb-2.5">
        <PostHeader
            profilePicture={profilePicture}
            name={name}
            username={username}
            time={time}
        />
        <div className="px-4 py-3">
            <p
                className="text-lg text-gray-700"
            >
                {tweet}
            </p>

        </div>

        <div className="flex items-center justify-between py-3 px-4 border-t border-gray-200 rounded-b-lg">
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleLike}
                            className="flex items-center space-x-1 text-gray-600 hover:text-red-500 focus:outline-none focus:shadow-outline transition-all duration-400"
                        >
                            {liked ? (<HeartIcon className="h-6 w-6 text-red-500 fill-current"/>) : (
                                <HeartIcon className="h-6 w-6 text-gray-600 hover:text-red-500"/>)}
                            <span className="text-gray-600 text-sm">{likes}</span>
                        </button>
                        <button
                            onClick={handleCommentToggle}
                            className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 focus:outline-none focus:shadow-outline transition-all duration-400"
                        >
                            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-600 hover:text-blue-500"/>
                            <span className=" text-gray-600 text-sm">{numberOfComments}</span>
                        </button>
                    </div>


                </div>
            </div>


            <div className="relative">
                <EllipsisHorizontalIcon
                    className="h-6 w-6 text-gray-500 hover:text-gray-600 cursor-pointer"
                    onClick={handleDropdownClick}
                />
                {isDropdownOpen && (<div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 py-2 w-56 bg-white rounded-lg shadow-xl z-20"
                >
                    {username === currentUser.username ? dropdownOptionsCurrentUser.map((option) => (<div
                        key={option.name}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                        onClick={() => handleDropdownOptionClick(option)}
                    >
                        {option.icon}
                        <span className="text-sm font-bold ml-2">{option.name}</span>
                    </div>)) : dropdownOptionsOtherUser.map((option) => (<div
                        key={option.name}

                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md space-x-2 flex items-center"
                        onClick={() => handleDropdownOptionClick(option)}
                    >
                        {option.icon}
                        <span className="text-sm font-bold ml-2">{option.name}</span>
                    </div>))}
                </div>)}
            </div>
        </div>

        {isReplyOpen && (<div className="flex flex-col p-4 space-y-4 border-t border-gray-200">
            {replies.map((reply) => (<div key={reply.replyId} className="flex space-x-4">
                <img
                    className="h-10 w-10 rounded-full"
                    src={reply.profilePicture}
                    alt="Profile"
                />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="flex flex-col space-y-1 items-start">
                                <div className="flex items-center space-x-2">
                                    <h1 className="text-sm font-bold">{reply.name}</h1>
                                    <h1 className="text-sm text-gray-500">
                                        @{reply.username}
                                    </h1>
                                    <h1 className="text-sm text-gray-500">{reply.time}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm text-gray-700">{reply.desc}</p>
                        </div>
                    </div>
                </div>
            </div>))}
            <form onSubmit={onReplySubmit} className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                    <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={currentUser.profilePicture}
                        alt="Profile"
                    />
                    <input
                        type="text"
                        value={reply}
                        onChange={(event) => setReply(event.target.value)}
                        placeholder="Tweet your reply"
                        className="flex-1 bg-gray-100 rounded-full px-4 py-1.5 focus:outline-none focus:shadow-outline hover:bg-gray-200 transition-all duration-400"
                    />
                    <button
                        type="submit"
                        disabled={!reply}
                        className="text-white bg-blue-400 rounded-full px-4 py-1.5 focus:outline-none focus:shadow-outline hover:bg-blue-500 transition-all duration-400 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-semibold focus:outline-none"
                    >
                        Post
                    </button>
                </div>
            </form>

        </div>)}
    </div>);

}


