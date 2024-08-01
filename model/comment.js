const { Schema, model } = require("mongoose");

const commentSchema = new Schema({

    content: {
        type: String,
        reqauired: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blogs"
    }

}, { timestamps: true })

const Comment = model("comments", commentSchema);

module.exports = Comment;