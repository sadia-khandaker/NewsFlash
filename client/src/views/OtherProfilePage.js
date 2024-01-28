import React, {useCallback, useEffect, useRef, useState, Fragment} from "react";
import {ListItemAvatar, Avatar, Button} from '@mui/material';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {Container, Divider, List, ListItem, ListItemSecondaryAction, ListItemText,} from "@mui/material";
import PageHeader from "../components/PageHeader";
import Sidebar from "../components/Sidebar";
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";
// import {FollowButton} from "../components/FollowButton";
import * as PropTypes from "prop-types";
import axios from "axios";
import {DisplayPosts} from "../components/DisplayPosts";
import {LockClosedIcon, LockOpenIcon} from "@heroicons/react/24/outline";


function FollowStatsButton(props) {
    const {currentUser, onClick, onClick1, followersList, followingList} = props;

    const statButtons = [
        {
            text: "Followers",
            count: followersList.length || 0,
            onClick,
        },
        {
            text: "Following",
            count: followingList.length || 0,
            onClick: onClick1,
        },
    ];

    return (
        <div className="flex justify-center items-center mt-2 flex col">
            <div className="flex items-center">
                {statButtons.map((button, index) => (
                    <Fragment key={index}>
                        <button onClick={button.onClick} className="focus:outline-none">
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <Typography
                                    variant="h6"
                                    component="span"
                                    sx={{
                                        color: "black",
                                        fontWeight: "600",
                                        fontSize: "1.5rem",
                                        lineHeight: "25px",
                                    }}
                                >
                                    {button.count}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="span"
                                    sx={{
                                        color: "#6b7280",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {button.text}
                                </Typography>
                            </div>
                        </button>
                        {index !== statButtons.length - 1 && (
                            <div
                                style={{
                                    width: "1px",
                                    height: "30px",
                                    backgroundColor: "gray",
                                    margin: "0 1rem",
                                }}
                            ></div>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

FollowStatsButton.propTypes = {
    onClick: PropTypes.func,
    onClick1: PropTypes.func,
    currentUser: PropTypes.object.isRequired,
    followersList: PropTypes.object.isRequired,
    followingList: PropTypes.object.isRequired
};


function FollowButton({ isFollowingOpen, onClick }) {
    const [isFollowing, setIsFollowing] = useState(isFollowingOpen);
    const text = isFollowing ? "Following" : "Follow";

    const handleClick = async () => {
        setIsFollowing(prev => !prev);
        try {
            await onClick();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button
            onClick={handleClick}
            sx={{
                backgroundColor: isFollowing ? "#efefef" : "#a08ff3",
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.01em",
                borderRadius: "9999px",
                padding: "6px 16px",
                textTransform: "none",
                border: isFollowing ? "1px solid #dae0e3" : "none",
                color: isFollowing ? "black" : "white",
                "&:hover": {
                    backgroundColor: isFollowing ? "#dbdbdb" : "#a08ff3", opacity: 0.8,
                },
            }}
        >
            {text}
        </Button>
    );
}

export default function OtherProfilePage() {
    const [isFollowingOpen, setIsFollowingOpen] = useState(false);
    const [isFollowersOpen, setIsFollowersOpen] = useState(false);
    const [followersList, setFollowersList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const currentUserStore = user ? {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
        username: user.username,
        isAnon: user.isAnon,
        profilePicture: user.profilePicture,
        displayName: user.displayName,
        displayUsername: user.displayUsername,
    } : null;
    
    const viewUser = JSON.parse(localStorage.getItem("viewUser"));
    const currentViewUserStore = viewUser ? {
        isAnon: viewUser.isAnon,
        _id: viewUser._id,
        authorUsername: viewUser.authorUsername,
        authorFirstName: viewUser.authorFirstName,
        authorLastName: viewUser.authorLastName,
        profilePicture: viewUser.profilePicture,
    } : null;

    async function checkFollowing() {
        try {
          const followcheck = await axios.get(`http://localhost:3001/user/${currentUser._id}/following/${viewingUser._id}`);
          setIsFollowing(followcheck.data.isFollowing);
          console.log(`the current user: ${currentUser._id} is following this profile: ${followcheck.data._id}`);
        } catch (error) {
          console.log(error.response.data);
          setError(error.response.data);
        }
    }

    const [currentUser, setCurrentUser] = useState(currentUserStore);
    const [viewingUser, setViewingUser] = useState(currentViewUserStore);

    const intervalRef = useRef(null);
  
    // const fetchUser = useCallback(async () => {
    //   try {
    //     setLoading(true);
    //     const response = await axios.get(
    //       `http://localhost:3001/user/${viewingUser._id}/getuser`
    //     );
    //     setViewingUser(response.data);
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // }, [viewingUser._id]);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError("");
        let userPosts;
        let sortedPosts;
        let post;
        let postRepliesResponse;
        let postReplies;

        if(viewingUser.isAnon === true){
            try {
                userPosts = await axios.get(`http://localhost:3001/post/${viewingUser._id}/personalposts/anon`);
                sortedPosts = userPosts.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
               
               for (let i = 0; i < sortedPosts.length; i++) {
                    post = sortedPosts[i];
                    postRepliesResponse = await axios.get(`http://localhost:3001/reply/${post._id}/allreplies`);
                    postReplies = postRepliesResponse.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); 
                    post.replies = postReplies;
               }
               
               setPosts(sortedPosts);
               setLoading(false);
             } catch (error) {
               console.log(error.response.data);
               setError(error.response.data);
               setLoading(false);
             }
        }
        else{
            try {
                userPosts = await axios.get(`http://localhost:3001/post/${viewingUser._id}/personalposts`);
                sortedPosts = userPosts.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
               
               for (let i = 0; i < sortedPosts.length; i++) {
                    post = sortedPosts[i];
                    postRepliesResponse = await axios.get(`http://localhost:3001/reply/${post._id}/allreplies`);
                    postReplies = postRepliesResponse.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); 
                    post.replies = postReplies;
               }
               
               setPosts(sortedPosts);
               setLoading(false);
             } catch (error) {
               console.log(error.response.data);
               setError(error.response.data);
               setLoading(false);
             }
        }
        
      }, []);

      useEffect(() => {
        fetchPosts();
    
        intervalRef.current = setInterval(() => {
            fetchPosts();
        }, 5000);
    
        return () => clearInterval(intervalRef.current);
    }, [fetchPosts]);
    
    
    const getFollowers = async (viewingUser) => {
        if (viewingUser) {
            console.log(`The current user is: ${viewingUser._id}`);
            console.log(`The profilepicture is: ${viewingUser.profilePicture}`);
            console.log(`The displayName is: ${viewingUser.displayName}`);
            console.log(`The displayUsername is: ${viewingUser.displayUsername}`);

            let anotherTempFollowersList = [];
            let tempFollowersList = [];
            try {
                const response = await axios.get(`http://localhost:3001/user/${viewingUser._id}/getFollowers`, {});
                if (response.status === 200) {
                    anotherTempFollowersList = response.data[0].followers;
                    let index = 0;
                    console.log(anotherTempFollowersList)
                    for(const follower of anotherTempFollowersList){
                        try {
                            console.log(follower)
                            const res = await axios.get(`http://localhost:3001/user/${follower}/getuser`, {});
                            console.log(res.data)
                            if (res.status === 200) {
                                tempFollowersList[index] = res.data;
                            }
                            } catch (error) {
                                console.log(error);
                                if (error.response.status === 400) {
                        
                                }
                        }
                        index++;
                    }
                    setFollowersList(tempFollowersList);
                }
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 400) {
            
                    }
            }
        }
    }

    const getFollowings = async(viewingUser) =>{
        if (viewingUser) {
            let anotherTempFollowingsList = [];
            let tempFollowingsList = [];
            try {
                const response = await axios.get(`http://localhost:3001/user/${viewingUser._id}/getFollowings`, {});
                if (response.status === 200) {
                    console.log(response.data)
                    anotherTempFollowingsList = response.data[0].following;
                    let index = 0;
                    console.log(anotherTempFollowingsList)
                    for(const following of anotherTempFollowingsList){
                        try {
                            console.log(following)
                            const res = await axios.get(`http://localhost:3001/user/${following}/getuser`, {});
                            console.log(res.data)
                            if (res.status === 200) {
                                tempFollowingsList[index] = res.data;
                            }
                            } catch (error) {
                                console.log(error);
                                if (error.response.status === 400) {
                        
                                }
                        }
                        index++;
                    }
                    setFollowingList(tempFollowingsList);
                }
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 400) {
            
                    }
                }
        }
    }

    const handleFollowingClick = () => {
        setIsFollowingOpen(true);
        
    };

    const handleFollowersClick = () => {
        setIsFollowersOpen(true);
    };
   
    // const handleFollowButtonClick = async () => {
    //     if(!isFollowing){
    //         try {
    //             const response = await axios.put(
    //               `http://localhost:3001/user/${currentUser._id}/follow`,
    //               {
    //                 targetUserId: viewUser._id,
    //               }
    //             );
    //             console.log(response.data.updatedUser);
    //             setIsFollowing(true);
    //           } catch (error) {
    //             console.log(error);
    //           }
    //     }else{
    //         try {
    //             const response = await axios.put(
    //               `http://localhost:3001/user/${currentUser._id}/unfollow`,
    //               {
    //                 targetUserId: viewUser._id,
    //               }
    //             );
    //             console.log(response.data.updatedUser);
    //             setIsFollowing(false);
    //           } catch (error) {
    //             console.log(error);
    //           }
    //     }
    //
    //
    //   };

    const handleFollowButtonClick = async () => {
        if (!isFollowing) {
            try {
                const response = await axios.put(
                    `http://localhost:3001/user/${currentUser._id}/follow`,
                    {
                        targetUserId: viewUser._id,
                    }
                );
                console.log(response.data.updatedUser);
                setIsFollowing(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axios.put(
                    `http://localhost:3001/user/${currentUser._id}/unfollow`,
                    {
                        targetUserId: viewUser._id,
                    }
                );
                console.log(response.data.updatedUser);
                setIsFollowing(false);
            } catch (error) {
                console.log(error);
            }
        }
    };



    const [posts, setPosts] = useState([]);

    const getAllPersonalPosts = async (viewingUser) => {
        if(viewingUser.isAnon){
            try {
                const response = await axios.get(`http://localhost:3001/post/${viewingUser._id}/personalposts/anon`);
                setPosts(response.data);
            } catch (error) {
                console.log(error);
    
            } finally {
                setLoading(false);
    
            }
        }else{
        try {
            const response = await axios.get(`http://localhost:3001/post/${viewingUser._id}/personalposts`);
            setPosts(response.data);
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);

        }
    }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            checkFollowing()
            getAllPersonalPosts(viewingUser);
            getFollowers(viewingUser);
            getFollowings(viewingUser);
        }, 2000); 
      
        return () => clearInterval(intervalId);
      }, [viewingUser]);
      

    return (
        <div className="w-full h-screen bg-gradient-to-br from-red-300 via-pink-300 to-indigo-400">
            <Sidebar/>
            <div className="w-4/5 mx-auto border-l border-r border-gray-300 fixed top-0 z-10 h-screen right-0 left-1/5 overflow-y-scroll">
                <PageHeader title="Profile Page"/>
                <div className="flex justify-center items-center flex-col border-b border-t border-gray-300 pt-4 bg-white opacity-95">
                    <div className="relative">
                        <button className="focus:outline-none">
                            <div className="relative">
                                <img className="rounded-full w-32 h-32 p-1 border-2 border-white mt-4 cursor-pointer" src={viewingUser.profilePicture} alt="" />
                                <div className="absolute top-0 right-0">
            <span
               className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer p-1`}>

            </span>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="mt-2 flex justify-center">
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-bold">
            <span className="bg-clip-text text-transparent bg-black font-bold text-4xl group-hover:text-gray-500 transition ease-in-out duration-150">
              {viewingUser.authorFirstName} {viewingUser.authorLastName}
            </span>
                            </h1>
                            <p className="text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-300 transition ease-in-out duration-150 pl-2">
                                @{viewingUser.authorUsername}
                            </p>
                        </div>
                    </div>
                    {viewingUser && (
                        <FollowStatsButton
                            viewingUser={viewingUser._id}
                            onClick={handleFollowersClick}
                            onClick1={handleFollowingClick}
                            followersList={followersList}
                            followingList={followingList}
                        />
                    )}
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col items-center justify-center w-4/12 mx-auto">
                        {viewingUser.about && (
                        <span className="text-sm text-gray-800" style={{
                            lineHeight: '20px',
                            fontSize: '15px',
                            color: '#262626',
                            fontWeight: '600'
                        }}>
                        {viewingUser.about}
                        </span>
                        )}
                        <p
                        className={`text-sm text-center ${
                            viewingUser.about ? "text-gray-800" : "text-gray-400"
                        }`}
                        style={{
                            lineHeight: "20px",
                            fontSize: "15px",
                            color: "#262626",
                            fontWeight: "400",
                            marginTop: "4px",
                        }}
                        >
                        {viewingUser.about || "-"}
                        </p>
                        {currentUser && (
                        <div className="mt-4">
                            {/*<FollowButton */}
                            
                            {/*currentUser={currentUser._id}*/}
                            {/*onClick={handleFollowButtonClick}*/}
                            {/*isFollowingOpen={isFollowing} />*/}

                            <FollowButton
                                isFollowingOpen={isFollowing}
                                onClick={handleFollowButtonClick}
                            />
                        </div>
                        )}
                    </div>
                    </div>

                <Divider
                    className={`w-1/4 mx-auto mb-2 ${!viewingUser.about && 'hidden'}`}
                    style={{height: "1px", backgroundColor: "#dbdbdb"}}
                />

                <div
                    className="flex flex-col relative mx-auto items-center pt-4 pb-4 px-4"
                    style={{height: "calc(100vh - 450px)"}}
                >
                    <div className="flex flex-col w-6/12">

                        {posts && posts.map((post) => (
                            <DisplayPosts
                                key={post._id}
                                postId={post._id}
                                userId={post.userId}
                                time={post.createdDate}
                                tweet={post.desc}
                                numberOfLikes={post.likesNum}
                                numberOfComments={post.replies.length}
                                profilePicture={viewingUser.profilePicture}
                                firstName={post.authorFirstName}
                                lastName={post.authorLastName}
                                username={post.authorUsername}
                            />
                        ))}

                    </div>
            </div>
            
            <Modal open={isFollowersOpen} onClose={() => setIsFollowersOpen(false)}>
                <Container
                    sx={{
                        position: "absolute",
                        width: 400,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        borderRadius: 5,
                        boxShadow: 24,
                        p: 2,
                        pt: 3,
                        pr: 3,
                        pl: 3,
                        overflow: "auto",
                        maxHeight: "calc(100% - 32px)", // subtract the padding value (2 * 16px)
                    }}
                >
                <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 800,
                    }}
                >
                Followers
                </Typography>
                <IconButton
                    onClick={() => setIsFollowersOpen(false)}
                    sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        p: 1,
                        m: 1,
                    }}
                >
                <Close/>
                </IconButton>
                        <List>
                            {followersList.map(({ _id, firstName, lastName, username, profilePicture }) => (
                                <ListItem key={_id}>
                                    <ListItemAvatar>
                                        <Avatar src={profilePicture ?? "/default-avatar.png"} />
                                    </ListItemAvatar>
                                <ListItemText primary={`${firstName} ${lastName}`} secondary={`@${username}`} />
                                <ListItemSecondaryAction>
                                    <FollowButton />
                                </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                </Container>
            </Modal>

            <Modal open={isFollowingOpen} onClose={() => setIsFollowingOpen(isFollowing)}>
                <Container
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 5,
                        boxShadow: 24,
                        p: 2,
                        pt: 3,
                        pr: 3,
                        pl: 3,
                        overflow: "auto",
                        maxHeight: "calc(100% - 32px)",
                    }}
                >
                <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 800,
                    }}
                >
                Following
                </Typography>
                <IconButton
                    onClick={() => setIsFollowingOpen(false)}
                    sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    p: 1,
                    m: 1,
                    }}
                >
                <Close/>
                </IconButton>
                <List>
                    {followingList.map(({ _id, profilePicture, firstName, lastName, username }) => (
                        <ListItem key={_id}>
                        <ListItemAvatar>
                            <Avatar src={profilePicture} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${firstName} ${lastName}`}
                            secondary={`@${username}`}
                        />
                        <ListItemSecondaryAction>
                            <FollowButton isFollowingOpen />
                        </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                
                </List>
                    
                </Container>
                    </Modal>



            </div>
        </div>
    );
}