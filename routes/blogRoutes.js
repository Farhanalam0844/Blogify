const express = require('express');
const Blog = require('../model/blog')
const User = require('../model/user')
const Comment = require('../model/comment')
const router = express.Router();
const multer = require('multer');
const path = require('path')
// const upload = multer({ dest: 'uploads/' })
router.get('/add-new', (req, res) => {
    res.render('new-blog', {
        user: req.user
    });
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
        const coverImage = `${Date.now()} - ${file.originalname} `;
        cb(null, coverImage)
    }
})

const upload = multer({ storage: storage });
router.post('/', upload.single('file'), async (req, res) => {
    const { title, body } = req.body;

    const blog = await Blog.create({
        title: title,
        body: body,
        coverImage: `${req.file.filename}`
    })
    // res.render(`blog/${blog._id}`, {
    //     user: req.user
    // });
    const blogs = await Blog.find({})
    
    res.render('home', {
        user: req.user,
        blogs: blogs
    })
})
router.get("/:id", async(req, res)=>{
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comment = await Comment.find({
        blogId:req.params.id
    }).populate('createdBy');

    res.render('blog',{
        user:req.user,
        blog,
        comment

    })
})
router.post("/comment/:blogId", async(req, res)=>{
    const comment = await Comment.create({
        content: req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user.id
    })
    console.log(req.user.id);
    res.redirect(`/blogs/${req.params.blogId}`);
    // res.render(`/blogs/${req.params.blogId}`,{
    //     user:req.user,
    // })
})

module.exports = router;