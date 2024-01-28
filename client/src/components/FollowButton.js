import React, {useState} from "react";
import Button from "@mui/material/Button";


// If the isFollowingOpen prop is true by default all the buttons will be following state

// const FollowButton = ({isFollowingOpen}) => {
//     const [isFollowing, setIsFollowing] = useState(isFollowingOpen);
//     const text = isFollowing ? "Following" : "Follow";
//     const handleClick = () => {
//         setIsFollowing((prev) => !prev);
//     }
//     return <Button
//         onClick={handleClick}
//         sx={{
//             backgroundColor: isFollowing ? "#efefef" : "#a08ff3",
//             fontWeight: "700",
//             fontSize: "14px",
//             lineHeight: "20px",
//             letterSpacing: "0.01em",
//             borderRadius: "9999px",
//             padding: "6px 16px",
//             textTransform: "none",
//             border: isFollowing ? "1px solid #dae0e3" : "none",
//             color: isFollowing ? "black" : "white",
//             "&:hover": {
//                 backgroundColor: isFollowing ? "#dbdbdb" : "#a08ff3",
//                 opacity: 0.8,
//             },
//         }}
//     >
//         {text}
//     </Button>
// }

export function FollowButton({isFollowingOpen}) {
    // if is followinf is not passed in then it will be false
    const [isFollowing, setIsFollowing] = useState(isFollowingOpen);
    const text = isFollowing ? "Following" : "Follow";
    const handleClick = () => {
        setIsFollowing((prev) => !prev);
        if (isFollowing) {//add

        } else {//remove

        }

    }
    return <Button
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
}


// export function FollowButton({ isFollowing, isFollowersModal = false }) {
//     const [following, setFollowing] = useState(isFollowing);
//     const text = following ? "Following" : isFollowersModal ? "Follow" : "Unfollow";
//     const handleClick = () => {
//         setFollowing(prev => !prev);
//     };
//     return (
//         <Button
//             onClick={handleClick}
//             sx={{
//                 backgroundColor: following ? "#efefef" : "#a08ff3",
//                 fontWeight: "700",
//                 fontSize: "14px",
//                 lineHeight: "20px",
//                 letterSpacing: "0.01em",
//                 borderRadius: "9999px",
//                 padding: "6px 16px",
//                 textTransform: "none",
//                 border: following ? "1px solid #dae0e3" : "none",
//                 color: following ? "black" : "white",
//                 "&:hover": {
//                     backgroundColor: following ? "#dbdbdb" : "#a08ff3",
//                     opacity: 0.8,
//                 },
//             }}
//         >
//             {text}
//         </Button>
//     );
// }


// export function FollowButton({ isFollowersModal }) {
//     const [isFollowing, setIsFollowing] = useState(!isFollowersModal);
//     const text = isFollowing ? "Following" : isFollowersModal ? "Followers" : "Follow";
//     const handleClick = () => {
//         setIsFollowing((prev) => !prev);
//     }
//     return <Button
//         onClick={handleClick}
//         sx={{
//             backgroundColor: isFollowing ? "#efefef" : "#a08ff3",
//             fontWeight: "700",
//             fontSize: "14px",
//             lineHeight: "20px",
//             letterSpacing: "0.01em",
//             borderRadius: "9999px",
//             padding: "6px 16px",
//             textTransform: "none",
//             border: isFollowing ? "1px solid #dae0e3" : "none",
//             color: isFollowing ? "black" : "white",
//             "&:hover": {
//                 backgroundColor: isFollowing ? "#dbdbdb" : "#a08ff3",
//                 opacity: 0.8,
//             },
//         }}
//     >
//         {text}
//     </Button>;
// }




export function FollowButtonNoProps() {
    const [isFollowing, setIsFollowing] = useState(false);
    const text = isFollowing ? "Following" : "Follow";
    const handleClick = () => {
        setIsFollowing((prev) => !prev);
    }
    return <Button
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
    </Button>;
}

// export function FollowButton({ isFollowing = false }) {
//     const [following, setFollowing] = useState(isFollowing);
//     const text = following ? "Following" : "Follow";
//     const handleClick = () => {
//         setFollowing((prev) => !prev);
//     };
//     return (
//         <Button
//             onClick={handleClick}
//             sx={{
//                 backgroundColor: following ? "#efefef" : "#a08ff3",
//                 fontWeight: "700",
//                 fontSize: "14px",
//                 lineHeight: "20px",
//                 letterSpacing: "0.01em",
//                 borderRadius: "9999px",
//                 padding: "6px 16px",
//                 textTransform: "none",
//                 border: following ? "1px solid #dae0e3" : "none",
//                 color: following ? "black" : "white",
//                 "&:hover": {
//                     backgroundColor: following ? "#dbdbdb" : "#a08ff3",
//                     opacity: 0.8,
//                 },
//             }}
//         >
//             {text}
//         </Button>
//     );
// }