const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        reqauired: true,
    },
    coverImage: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },

}, { timestamps: true })

const Blog = model("blogs",blogSchema);

module.exports= Blog;