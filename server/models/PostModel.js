import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";


const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  desc: {type: String},
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
  replies: [{
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Replies',
  }}],
  anonymousPost: {
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
  showComments: {type: Boolean, default: false},
  updatedDate: {
    type: Date,
  }
},
{
   timestamps: true
});


PostSchema.statics.deletePostById = async function(post) {
   try {
      console.log("post: ", post);

     const result = await this.findByIdAndDelete(post._id);
     return result;
   } catch (error) {
     throw error;
   }
};


PostSchema.methods.likePost = async function(user) {
   //check if the user is anonymous before adding to the private likes list
   const userLiking = await UserModel.findById(user._id);
    //check if the user is already in the likes list. if they are, do nothing.
   if (this.likesIncludingAnon.includes(userLiking)) {
     return;
   }
    //if the anonymous setting is on, don't put their user in the public likes array, only make the likes count go up and put them in the private likes array
   if (userLiking.isAnon) {
     this.likesNum++;
     this.likesIncludingAnon.push(userLiking._id);
   }
   //if the anonymous setting is on, add user to public and private likes array and make the like count go up
   else {
     this.likesNum++;
     this.likesIncludingAnon.push(userLiking._id);
     this.likes.push( userLiking._id );
   }
   await this.save();
 };


const PostModel = mongoose.model("Posts", PostSchema)
export default PostModel