import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import PostModel from "../models/PostModel.js";

const ReplySchema = mongoose.Schema({        
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
    //required: true,
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    //required: true,
  },
  desc: {type: String, 
    //required: true
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
   }}],
   
  likesIncludingAnon: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
  }}],
  
  likesNum: Number,
  image: String,
  anonymousReply: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  authorFirstName: {
    type: String,
    default: "Anonymous",
  },
  authorLastName: {
    type: String,
    default: "",
  },
  authorUsername: {
    type: String,
    default: "Anonymous",
  },
  updatedDate: {
    type: Date,
  }
},
{
    timestamps: true
});


ReplySchema.statics.deleteReplyById = async function(reply) {
    try {
      const result = await ReplyModel.findByIdAndDelete(reply._id);
      return result;
    } catch (error) {
      throw error;
    }
};

ReplySchema.methods.likeReply = async function(userId) {
    //check if the user is anonymous before adding to the private likes list
    const user = await UserModel.findById(userId._id);
  
    //check if the user is already in the likes list. if they are, do nothing.
    if (this.likesIncludingAnon.includes(userId._id)) {
      return;
    }
  
    //if the anonymous setting is on, don't put their user in the public likes array, only make the likes count go up and put them in the private likes array
    if (user.isAnon) { 
      this.likesNum++;
      this.likesIncludingAnon.push(user._id);
    } 
    //if the anonymous setting is on, add user to public and private likes array and make the like count go up
    else {
      this.likesNum++;
      this.likesIncludingAnon.push(user._id);
      this.likes.push( user._id );
    }
    await this.save();
  };
/*
//adding a reply
ReplySchema.methods.addReply = async function(replyId, postId) {
  try {
    if (!PostModel.getPost(postId).includes(replyId)) {
      await PostModel.getPost(postId).updateOne({ $push: { replies: replyId } });
      await ReplyModel.updateOne({ _id: replyId }, { $set: { postId: postId } });
    }
  } catch (error) {
    throw error;
  }
};

//removing reply
ReplySchema.methods.removeReply = async function(replyId, postId) {
  try {
    if (PostModel.findById(postId).includes(replyId)) {
      await PostModel.findById(postId).updateOne({ $pull: { replies: replyId } });
      await ReplyModel.deleteReplyById(replyId);
      //await PostModel.updateOne({ _id: replyId }, { $set: { postId: postId } });
    }
  } catch (error) {
    throw error;
  }
};
*/
const ReplyModel = mongoose.model("Replies", ReplySchema);
export default ReplyModel
