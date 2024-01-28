import PostModel from "../models/PostModel.js";

export const createPost = async (req, res) => {
  const { user, profilePicture, desc, image, anonymousPost } = req.body;

  // Set default author information for anonymous posts
  let authorFirstName = "Anonymous";
  let authorLastName = "";
  let authorUsername = "Anonymous";

  if (!anonymousPost) {
    // Use actual user information for non-anonymous posts
    authorFirstName = req.body.authorFirstName;
    authorLastName = req.body.authorLastName;
    authorUsername = req.body.authorUsername;
  }

  try {
    const post = new PostModel({
      user,
      profilePicture,
      authorFirstName,
      authorLastName,
      authorUsername,
      desc,
      image,
      likesNum: 0,
      anonymousPost,
      
    });
    console.log(`The current user is: ${user}`);
    console.log(`The desc is: ${desc}`);
    console.log(`The profilepic is: ${profilePicture}`);
    console.log(`The authorFirstName is: ${authorFirstName}`);
    console.log(`The authorLastName is: ${authorLastName}`);
    console.log(`The authorUsername is: ${authorUsername}`);
    //console.log(`The numLikes is: ${likesNum}`);
    console.log(`The post is anon: ${anonymousPost}`);

    await post.save();
    let populatedPost = await PostModel.findById(post._id)
    .populate({
      path: 'user',
      select: ['firstName', 'lastName', 'email', 'username', 'isAnon'],
    })
    .exec();

    populatedPost = await PostModel.findById(post._id)
    .populate({
      path: 'replies',
      select: ['post', 'user', 'authorFirstName', 'authorLastName','authorUsername','desc', 'anonymousReply'],
    })
    .exec();

    populatedPost.save();
    res.status(201).json(populatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create post." });
  }
};


export const getAllPosts = async(req, res)=>{
  try {
      let allPosts = await PostModel.find({})
        .populate('user', 'firstName lastName username isAnon')
        .populate('replies', 'post user authorFirstName authorLastName authorUsername desc anonymousReply')
        .sort({createdDate: -1});
      res.status(200).json(allPosts);
  } catch (error) {
      res.status(500).json(error)
  }
}

 export const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId._id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

// edit a post
export const editPost = async(req, res) => {
  const { post } = req.params;
  const { desc, anonymousPost, updatedAt } = req.body;

  try{
      const postToUpdate = await PostModel.findByIdAndUpdate(post._id, {desc, anonymousPost, updatedAt}, {new: true});
     
      if (!postToUpdate) {
          return res.status(404).json({ message: "Post could not be edited: Post not found" });
      }

      if (postToUpdate.user._id !== req.user._id) {
          return res.status(403).json({ message: "Post could not be edited: You can only edit your own posts." });
      }

      postToUpdate.desc = desc;
      postToUpdate.anonymousPost = anonymousPost;
      postToUpdate.updatedAt = updatedAt;

      const updatedPost = await postToUpdate.save();
      res.status(200).json(updatedPost);

  } catch (error) {
      res.status(500).json({ message: "Post could not be edited: error occurred." });
  }
  
};


export const deletePost = async (req, res) => {
  const postId = req.body.postId;
  try {
    const result = await PostModel.findByIdAndDelete(postId);
    if (result) {
      res.status(200).json({ message: `Post ${postId} has been deleted` });
    } else {
      res.status(404).json({ message: `Post could not be deleted: Post not found. ${postId}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Post could not be deleted: Server error occurred." });
  }
};



//liking a post


export const likePost = async (req, res) => {
    const { postId, userId } = req.body;

    try {
        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Error liking post: Post not found" });
        }

        const isLiked = post.likes.some(like => like.user.toString() === userId);

        if (!isLiked) {
            post.likes.push({ user: userId });
            post.likesNum = post.likes.length;
            await post.save();
        }

        if (post.likes.length === 0) {
            post.likesNum = 0;
            await post.save();
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};
export const getAllPersonalPostAnon = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userPosts = await PostModel.find({ user: userId, anonymousPost: true }).sort({ createdDate: -1 });
    res.status(200).json(userPosts);
  } catch (error) {
    console.log(error)
;    res.status(500).json(error);
  }
};
// unlike a post
export const unlikePost = async (req, res) => {
    const { postId, userId } = req.body;

    try {
        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Error unliking post: Post not found" });
        }

        const updatedLikes = post.likes.filter(like => like.user.toString() !== userId);

        if (updatedLikes.length === post.likes.length) {
            return res.status(400).json({ message: "Error unliking post: User has not liked the post" });
        }

        post.likes = updatedLikes;

        // check if the current likesNum is already 0 before subtracting 1
        if (post.likesNum > 0) {
            post.likesNum -= 1;
        }

        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const getAllPersonalPost = async (req, res) => {
  const userId = req.params.userId;
  const isAnon = req.query.isAnon; 
  
  try {
    let userPosts;
    if (isAnon) {
      userPosts = await PostModel.find({ user: userId, anonymousPost: true }).sort({ createdDate: -1 });
    } else {
      userPosts = await PostModel.find({ user: userId, anonymousPost: false }).sort({ createdDate: -1 });
    }
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};



//commenting on a post
/*export const addReply = async (req, res) => {
  const postId = req.params.postId;
  const replyId = req.body.replyId;

  try {
    const post = await PostModel.findById(postId);
    await post.addReply(replyId);

    res.status(200).json("User followed successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
};*/
