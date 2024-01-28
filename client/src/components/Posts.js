import {useState} from "react";
import {ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon} from "@heroicons/react/24/outline";


function Post({user}) {
    const [commentList, setCommentList] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        setCommentList([...commentList, comment]);
        setComment("");
    };


    return (
        <div className="flex items-center space-x-4">
            <img className="h-10 w-10 rounded-full object-cover" src={user.profilePicture} alt="Profile"/>
            <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                    {user.username}
                </div>
                <div className="text-sm text-gray-500">
                    {user.createdAt}
                </div>
                <p className="mt-2 text-base text-gray-700">{user.tweet}</p>
                <div className="flex items-center text-gray-400 hover:text-blue-600 focus:outline-none mr-4">
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center text-gray-400 hover:text-blue-600 focus:outline-none"
                    >
                        <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6"/>
                        <span className="ml-1">{commentList.length}</span>
                    </button>
                    {showComments && (
                        <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-4">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={user.profilePicture}
                                alt="Profile"
                            />
                            <div className="flex-1">
                                <label htmlFor="comment-input" className="sr-only">
                                    Add a comment
                                </label>
                                <input
                                    id="comment-input"
                                    type="text"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                    placeholder="Add a comment"
                                    className="w-full bg-gray-100 rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!comment}
                                className="flex-shrink-0 text-white bg-blue-400 rounded-full px-4 py-1.5 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <PaperAirplaneIcon className="w-6 h-6 stroke-current stroke-2"/>
                                <span className="sr-only">Post</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Post;



