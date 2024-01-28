import ReplyModel from "../models/ReplyModel.js";
import PostModel from "../models/PostModel.js";

export const getReply = async (req, res) => {
    const replyId = req.params.id;
  
    try {
      const reply = await ReplyModel.findById(replyId);
  
      if (reply) {
        res.status(200).json(reply);
      } else {
        res.status(404).json({ message: 'Error: Reply not found.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error: Could not find reply.', error });
    }
  };

 export const createReply = async (req, res) => {
  //const { post } = req.params;
  const post = req.body.post;
  const user = req.body.user;
  const desc = req.body.desc;
  const image = req.body.image;
  const anonymousReply = req.body.anonymousReply;

  // Set default author information for anonymous posts
  let authorFirstName = "Anonymous";
  let authorLastName = "";
  let authorUsername = "Anonymous";

  if (!anonymousReply) {
    // Use actual user information for non-anonymous posts
    authorFirstName = req.body.authorFirstName;
    authorLastName = req.body.authorLastName;
    authorUsername = req.body.authorUsername;
  }

  try {
    const reply = new ReplyModel({
      post,
      user,
      desc,
      image,
      likesNum: 0,
      anonymousReply,
      authorFirstName,
      authorLastName,
      authorUsername,
    });
    
    await reply.save();
    const postWithReply = await PostModel.findById(post);
    if (!postWithReply) {
      return res.status(404).json({ message: `Post not found: ${post}` });
    }
    let pop = await PostModel.findById(post)
      .populate({
        path: 'user',
        select: ['firstName', 'lastName', 'email', 'username', 'isAnon', 'replies'],
      })
      .populate({
        path: 'replies',
        select: ['post', 'user', 'authorFirstName', 'authorLastName', 'authorUserame', 'desc', 'anonymousReply'],
      })
      .exec();
    
    pop.replies.push(reply._id); // use the _id of the newly created reply
    
    await pop.save();
    res.status(201).json(reply);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Failed to create reply.` });
  }

};


// edit a reply
export const editReply = async(req, res) => {
    const { replyId } = req.params;
    const { desc, anonymousReply, updatedAt } = req.body;
  
    try{
        const reply = await ReplyModel.findByIdAndUpdate(replyId, {desc, anonymousReply, updatedAt}, {new: true});
       
        if (!reply) {
            return res.status(404).json({ message: "Reply could not be edited: Reply not found" });
        }
  
        if (reply.userId !== req.user.userId) {
            return res.status(403).json({ message: "Reply could not be edited: You can only edit your own replys." });
        }
  
        reply.desc = desc;
        reply.anonymousReply = anonymousReply;
        reply.updatedAt = updatedAt;

        const updatedReply = await reply.save();
        res.status(200).json(updatedReply);

    } catch (error) {
        res.status(500).json({ message: "Reply could not be edited: error occured." });
    }
    
 };

//delete a reply
export const deleteReply = async (req, res) => {
    const replyId = req.params.id;
    try {
      const result = await ReplyModel.deleteReplyById(replyId);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Reply could not be deleted: Reply not found." });
      }
    } catch (error) {
      res.status(500).json({ message: "Reply could not be deleted: Server error occured." });
    }
};

//liking a reply
export const likeReply = async (req, res) => {
    const { replyId } = req.params;
    const { userId } = req.body;
    try {
      const reply = await ReplyModel.findById(replyId);
     
      if (!reply) {
        return res.status(404).json({ message: "Error liking reply: Reply not found" });
      }
    
      await reply.likeReply(userId);
  
      res.status(200).json(reply);
    } catch (error) {
      res.status(500).json(error);
    }
  
};

export const getAllReplyForPost = async(req, res)=>{
  const postId = req.params.id

  try {
      const postReplies = await ReplyModel.find({postId: postId})
      if (!postReplies) {
          return res.status(404).json({ error: "No replies found for this post." })
      }
      postReplies.sort((older,newer)=>{
          return newer.createdDate - older.createdDate;
      })
      res.status(200).json(postReplies);
  } catch (error) {
      res.status(500).json(error)
  }
}

export const addReplyToPost = async(req, res) => {
  const post = req.body.post; 
  const reply = req.body.reply; 


  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      post,
      { $push: { replies: reply } },
      { new: true }
    );
  
    if (!updatedPost) {
      return res.status(404).json({ message: `Reply could not be added to Post: Post not found: ${post}` });
    }
  
    if (!reply) {
      return res.status(404).json({ message: "Reply could not be added to Post: Reply not found" });
    }
  
    console.log(`Reply added to post: ${post}`);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Reply could not be added to Post: error occurred." });
  }
  
  
};
