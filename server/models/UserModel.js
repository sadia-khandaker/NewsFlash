import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    isAnon: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      default: "Anonymous"
    },
    displayUsername: {
      type: String,
      default: "Anonymous"
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    profilePicture: {type: String, default:"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"},
    about: {type: String, default: "-"},
    followers: [],
    following: []
  },
  { timestamps: true }
)

UserSchema.methods.deleteUserByID = async function (userId) {
  try {
    const result = await this.findByIdAndDelete(userId);
    return result;
  } catch (error) {
    throw error;
  }
}

UserSchema.statics.updateUserById = async function (userId, isAnon, profilePicture, displayName, displayUsername, firstName, lastName, username, email, password) {
  try {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("User could not be updated: User not found");
    }
    if (isAnon != null) {
      user.isAnon = isAnon;
    }
    if (profilePicture != null) {
      user.profilePicture = profilePicture;
    }
    if (displayName != null) {
      user.displayName = displayName;
    }
    if (displayUsername != null) {
      user.displayUsername = displayUsername;
    }
    if (firstName != null) {
      user.firstName = firstName;
    }
    if (lastName != null) {
      user.lastName = lastName;
    }
    if (username  != null) {
      user.username = username;
    }
    if (email != null) {
      user.email = email;
    }
    if (password != null) {
      user.password = password;
    }

    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

UserSchema.methods.followUser = async function (userId) {
  try {
    if (!this.following.includes(userId)) {
      await this.updateOne({ $push: { following: userId } });
      await UserModel.updateOne({ _id: userId }, { $push: { followers: this._id } });
    }
  } catch (error) {
    throw error;
  }
};

UserSchema.methods.unfollowUser = async function (userId) {
  try {
    if (this.following.includes(userId)) {
      await this.updateOne({ $pull: { following: userId } });
      await UserModel.updateOne({ _id: userId }, { $pull: { followers: this._id } });
    }
  } catch (error) {
    throw (error);
  }
};


const UserModel = mongoose.model("Users", UserSchema);
export default UserModel
