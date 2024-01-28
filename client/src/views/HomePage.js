import {
    CameraIcon,
    ChatBubbleLeftRightIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/24/outline";

import React, {useCallback, useEffect, useRef, useState} from "react";
import {Typography} from "@mui/material";
import Sidebar from "../components/Sidebar";

import SearchBar from "../components/SearchBar";
import FollowButton from "../components/FollowButton";

import * as PropTypes from "prop-types";
import axios from "axios";
import PageHeader from "../components/PageHeader";
import {DisplayPosts} from "../components/DisplayPosts";
import {DropdownMenu} from "../components/DropdownMenu";

function HomePageTitle(props) {
    return (
        <div className="flex items-center justify-between border-b border-gray-200 py-4">
            <Typography variant="h4">{props.title}</Typography>
        </div>
    );
}

HomePageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

DisplayPosts.propTypes = {
    profilePicture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    tweet: PropTypes.string.isRequired,
    likesNum: PropTypes.number.isRequired,
    numberOfComments: PropTypes.number.isRequired,
    numberOfRetweets: PropTypes.number.isRequired,

    replies: PropTypes.arrayOf(
        PropTypes.shape({
            profilePicture: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            comment: PropTypes.string.isRequired,
        })
    ),

    multimedia: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(["image", "video", "gif"]).isRequired,
            url: PropTypes.string.isRequired,
        })
    ),
};


function LikeButton({post, currentUser}) {
    const [likesNum, setLikesNum] = useState(post.likesNum || 0);
    const [isLiked, setIsLiked] = useState((post.likes || []).some(like => like.user === currentUser._id));


    const handleLike = async () => {
        try {
            const isAlreadyLiked = post.likes.some(like => like.user === currentUser._id);

            const response = isAlreadyLiked
                ? await axios.post(`http://localhost:3001/post/unlike`, {postId: post._id, userId: currentUser._id})
                : await axios.post(`http://localhost:3001/post/like`, {postId: post._id, userId: currentUser._id});

            if (response.status === 200) {
                console.log(`Post ${post._id} by ${post.user.username} has ${response.data.likesNum} likes. Current user ${currentUser.username} ${isAlreadyLiked ? "unliked" : "liked"} the post.`);
                setLikesNum(response.data.likesNum);
                setIsLiked(!isAlreadyLiked);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="flex items-center mr-4 text-gray-400 focus:outline-none hover:text-red-500 hover:stroke-red-500">
            <button className="flex items-center focus:outline-none" onClick={handleLike}>
                <HeartIcon
                    className={`w-6 h-6 ${isLiked ? "fill-red-500 stroke-red-500" : ""} ${
                        !isLiked ? "group-hover:text-gray-400 group-hover:stroke-gray-400" : ""
                    } text-current`}
                />
                <span className="ml-1">{likesNum}</span>
            </button>
        </div>
    );
}

function CommentSection({post, repliesList, handleSubmitReply, currentUser}) {


    const [replyDesc, setReplyDesc] = useState("");

    const [wait, setWait] = useState(false);
    const commentSectionRef = useRef(null);

    const handleCommentToggle = () => {
        setShowComments(!showComments);
    };


    function CommentButton({showComments, repliesList, onClick}) {
        return (
            <div
                className={`flex items-center justify-center rounded-full text-gray-400 hover:text-blue-600 focus:outline-none mr-4 ${
                    showComments ? "text-blue-600" : ""
                }`}
                onClick={onClick}
            >
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6"/>
                <span className="ml-1">{repliesList.length}</span>
            </div>
        );
    }


    const setShowComments = (value) => {
        if (value && commentSectionRef.current) {
            commentSectionRef.current.style.display = "block";
        } else if (!value && commentSectionRef.current) {
            commentSectionRef.current.style.display = "none";
        }
        setShowCommentsState(value);
    };

    const [showComments, setShowCommentsState] = useState(false);

    return (
        <div className="flex flex-col items-start">
            <div className="flex items-center">
                <LikeButton post={post} currentUser={currentUser}/>
                <CommentButton showComments={showComments} repliesList={repliesList} onClick={handleCommentToggle}/>
            </div>
            <div className="flex flex-col w-full">
                {showComments && (
                    <div className="flex flex-col w-full">
                        {repliesList.map((reply) => (
                            <div key={reply.id} className="flex space-x-4">
                                <img className="h-10 w-10 rounded-full" src={reply.profilePicture} alt="Profile"/>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex flex-col space-y-1 items-start">
                                                <div className="flex items-center space-x-2">
                                                    <h1 className="text-sm font-bold">
                                                        {reply.authorFirstName} {reply.authorLastName}
                                                    </h1>
                                                    <h1 className="text-sm text-gray-500">@{reply.authorUsername}</h1>
                                                    <h1 className="text-sm text-gray-500">{reply.time}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-sm text-gray-700">{reply.replyDesc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setWait(true);
                                handleSubmitReply(post, replyDesc)
                                    .then(() => {
                                        setWait(false);
                                        setReplyDesc("");
                                        // post.repliesNum += 1;
                                        // console.log(`Replies num: ${post.repliesNum}`);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        setWait(false);
                                    });
                            }}
                            className="mt-4"
                        >
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-start space-x-4">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        // TODO: Change this to the user's profile picture
                                        src={"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
                                        alt="Profile"
                                    />
                                    <div className="flex-1 relative">
                                        <label htmlFor={`comment-input-${post}`} className="sr-only">
                                            Reply to this comment
                                        </label>
                                        <div className="relative">
    <textarea
        id={`comment-input-${post}`}
        className="w-full h-10 px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-none flex items-center"
        placeholder="Add a reply..."
        value={replyDesc}
        onChange={(e) => setReplyDesc(e.target.value)}
    />
                                            <div
                                                className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400"/>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        className={`flex-shrink-0 text-white rounded-full px-4 py-1.5 focus:outline-none transition-colors duration-200 ${
                                            wait || !replyDesc
                                                ? 'bg-gray-300 cursor-not-allowed opacity-50'
                                                : 'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600'
                                        }`}
                                        disabled={wait || !replyDesc}
                                    >
                                        <PaperAirplaneIcon className="w-6 h-6 stroke-current stroke-2"/>
                                        <span className="sr-only">Post</span>
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );

}


export const HomePage = () => {
    const [post, setPost] = useState("");
    const [reply, setReply] = useState("");

    const [desc, setDesc] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    const [repliesList, setRepliesList] = useState([]);
    const [replyDesc, setReplyDesc] = useState("");
    const [wait, setWait] = useState(false);


    const user = JSON.parse(localStorage.getItem("user"));
    const currentUserStore = user ? {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
        username: user.username,
        isAnon: user.isAnon
    } : null;

    const intervalRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(currentUserStore);
    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:3001/user/${currentUser._id}/getuser`
            );
            setCurrentUser(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [currentUser._id]);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`http://localhost:3001/post/getallposts`);
            const sortedPosts = response.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

            for (let i = 0; i < sortedPosts.length; i++) {
                const post = sortedPosts[i];
                const postRepliesResponse = await axios.get(`http://localhost:3001/reply/${post._id}/allreplies`);
                const postReplies = postRepliesResponse.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // Sort replies based on sorting key
                post.replies = postReplies;
            }

            setPosts(sortedPosts);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data);
            setLoading(false);
        }
    }, [currentUser._id, currentUser.isAnon]);

    useEffect(() => {
        fetchPosts();

        intervalRef.current = setInterval(() => {
            fetchPosts();
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [fetchPosts]);

    useEffect(() => {
        fetchUser();
    }, [currentUser, fetchUser]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const isAnonymous = currentUser.isAnon;
        console.log(`The post will be anon: ${currentUser.isAnon}`);

        try {
            const response = await axios.post(
                `http://localhost:3001/post/create`,
                {
                    user: currentUser._id,
                    profilePicture: currentUser.profilePicture,
                    authorFirstName: currentUser.firstName,
                    authorLastName: currentUser.lastName,
                    authorUsername: currentUser.username,
                    desc: desc,
                    image: image,
                    likesNum: 0,
                    anonymousPost: isAnonymous,
                }
            );

            console.log(response.data);
            setDesc("");
            setImage(null);
            setLoading(false);
            console.log(`Post submitted: ${post}`);
            console.log(`The post was anon: ${currentUser.isAnon}`);
            setPost("");

            await fetchPosts(); // Fetch all the posts again to update the list
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data);
            setLoading(false);
        }
    };

    const handleDelete = async (post) => {
        setLoading(true);

        try {
            const response = await axios.delete(`http://localhost:3001/post/delete`, {data: {postId: post._id}});
            console.log(response.data);
            setLoading(false);
            console.log(`Post deleted: ${post}`);
            try {
                const resp = await axios.get(`http://localhost:3001/post/${currentUser._id}/personalposts`);

                console.log(resp.data);
                setLoading(false);
                console.log(`Post displayed: ${post}`);
                setPost("");
                const updatedPosts = [response.data, ...posts];
                setPosts(updatedPosts);
            } catch (error) {
                // Here is where the error is happening
                console.log(error.resp.data);
                setError(error.resp.data);
                setLoading(false);
            }

        } catch (error) {
            console.log(error.response.data);
            console.log(`Post couldn't be deleted: ${post._id}`);
            setError(error.response.data);
            setLoading(false);
        }

    };

    const handlePostEdit = async (post) => {
        setLoading(true);

        try {
            const response = await axios.put(`http://localhost:3001/post/edit`, {
                post: post,
                anonymousPost: currentUser.isAnon,
                desc: desc,
                updatedAt: new Date(),
            });

            console.log(response.data);
            setLoading(false);
            console.log(`Post editted: ${post}`);
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data);
            setLoading(false);
        }
    };

    const handleProfile = async (post) => {
        try {
          const viewUser = {
            isAnon: post.anonymousPost,
            _id: post.user._id,
            authorUsername: post.authorUsername,
            authorFirstName: post.authorFirstName,
            authorLastName: post.authorLastName,
            profilePicture: post.user.profilePicture,
          };
          
          localStorage.setItem("viewUser", JSON.stringify(viewUser));
          const viewUserStr = localStorage.getItem("viewUser");
          if (viewUserStr) {
            const viewUser = JSON.parse(viewUserStr);
            console.log(viewUser);
            window.location.href = "/otherprofile"
          } else {
            console.log("Error: viewUser is undefined");
          }
        } catch (err) {
          console.log(err);
        }
      };
      
    const handlePostImageChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setPost(reader.result);
            };

            reader.readAsDataURL(file);
            setImage(file);
        } else {
            setPost(null);
            setImage(null);
        }
    };

    // const handleSubmitReply = useCallback(async (post) => {
    //     setWait(true);
    //     const isAnonymous = currentUser.isAnon;
    //     console.log(`The reply will be on: ${post}`);
    //     // handle submitting the comment reply
    //     try {
    //         const response = await axios.post(
    //             `http://localhost:3001/reply/create`,
    //             {
    //                 post: post._id,
    //                 user: currentUser._id,
    //                 authorFirstName: currentUser.firstName,
    //                 authorLastName: currentUser.lastName,
    //                 authorUsername: currentUser.username,
    //                 desc: replyDesc,
    //                 image: image,
    //                 likesNum: 0,
    //                 anonymousReply: isAnonymous,
    //             }
    //         );
    //
    //         console.log(response.data);
    //         setReplyDesc("");
    //         setImage(null);
    //         setWait(false);
    //         console.log(`reply submitted: ${response.data._id}`);
    //         console.log(`postId: ${post._id}`);
    //         setReply(response.data); // store the newly created reply object
    //     } catch (error) {
    //         console.log(error.response.data);
    //         setError(error.response.data);
    //         setWait(false);
    //     }
    // }, []);


    const handleSubmitReply = useCallback(async (post, replyDesc) => {
        setWait(true);
        const isAnonymous = currentUser.isAnon;
        console.log(`This is the post: ${post} posted by ${post.authorUsername}, and this is the reply: ${replyDesc}`);

        // handle submitting the comment reply
        try {
            const response = await axios.post(
                `http://localhost:3001/reply/create`,
                {
                    post: post._id,
                    user: currentUser._id,
                    authorFirstName: currentUser.firstName,
                    authorLastName: currentUser.lastName,
                    authorUsername: currentUser.username,
                    desc: replyDesc,
                    image: image,
                    likesNum: 0,
                    anonymousReply: isAnonymous,
                }
            );

            console.log(response.data);
            setReplyDesc("");
            setImage(null);
            setWait(false);
            console.log(`reply submitted: ${response.data._id}`);
            console.log(`postId: ${post._id}`);
            setReply(response.data); // store the newly created reply object
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data);
            setWait(false);
        }
    }, [replyDesc]);


    return (
        <div className="flex flex-col w-full h-screen bg-gray-100 relative">
            <div className="absolute top-0 bottom-0 left-0 w-1/4">
                <Sidebar/>
            </div>
            <div className="absolute top-0 right-0 p-4">
                <SearchBar/>
            </div>
            <div className="mx-auto border-lr border-gray-300 absolute inset-0 flex flex-col items-stretch"
                 style={{width: "calc(60% - 2px)"}}>
                <PageHeader title={"Home"}/>
                <div className="flex-grow p-4">
                    {/* Add content here */}
                    <div className="bg-white border rounded-lg shadow-lg p-4">
                        <div className="flex items-start">
                            <img
                                className="h-12 w-12 rounded-full mr-4"
                                src={currentUser.profilePicture}
                                //alt="User Avatar"
                            />
                            <div className="w-full">
              <textarea
                  className="w-full h-28 resize-none focus:outline-none text-xl"
                  placeholder="What's on your mind?"
                  value={desc || ''}
                  onChange={(e) => setDesc(e.target.value)}

              />

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center">
                                        <label
                                            htmlFor="image-upload"
                                            className="h-10 w-10 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 flex items-center justify-center"
                                            title={"Upload Image"}
                                        >
                                            <CameraIcon/>
                                        </label>
                                        <input
                                            type="file"
                                            id="image-upload"
                                            className="hidden"
                                            onChange={handlePostImageChange}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className={`flex items-center justify-center h-12 px-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 via bg-indigo-400 hover:shadow-md hover:scale-105 focus:outline-none text-white ${!desc ? "opacity-50 cursor-not-allowed bg-gray-300" : ""}`}
                                            onClick={handleSubmit}
                                            disabled={!desc}
                                        >
                                            <span className="text-lg font-bold">Post</span>
                                            <PaperAirplaneIcon className="w-6 h-6 ml-2 stroke-current stroke-2"/>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <div className="bg-white border rounded-lg shadow-lg p-4 mt-4">
                                <div className="flex items-start">
                                    <img
                                        className="h-12 w-12 rounded-full mr-4"
                                        src={
                                            post.user &&
                                            // (post.user.isAnon
                                            //     ? "https://cdn-icons-png.flaticon.com/512/634/634742.png"
                                            //     : post.user.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg")
                                            (post.anonymousPost
                                                     ? "https://cdn-icons-png.flaticon.com/512/634/634742.png"
                                                     : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg")
                                        }
                                        alt="User Avatar"
                                    />

                                    <div className="w-full">
                                        <div className="flex items-center">
                                            <h3 className="font-bold mr-2">{post.user && post.authorFirstName} {post.user && post.authorLastName}</h3>
                                            <span className="text-gray-400">@{post.user && post.authorUsername}</span>

                                        </div>

                                        <p className="text-gray-600 mt-2 text-lg">{post.desc}</p>

                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center">
                                                {/*TODO: Make the like button and comment button in the same place*/}
                                                <CommentSection post={post} repliesList={repliesList}
                                                                handleSubmitReply={handleSubmitReply}
                                                                replyDesc={replyDesc} setReplyDesc={setReplyDesc}
                                                                currentUser={currentUser}/>
                                            </div>
                                            <DropdownMenu post={post} handlePostEdit={handlePostEdit} handleDelete={handleDelete} handleProfile ={handleProfile}/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


