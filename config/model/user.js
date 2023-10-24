import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    bio: String,
    profileUrl: String,
})

export default mongoose.models.User || mongoose.model("User", userSchema);