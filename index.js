const express = require('express')
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const mongoose= require('mongoose');
var cookieParser = require('cookie-parser');
const { validateTheUserCookie } = require('./middlewares/auth');
const Blog = require('./model/blog');
app = express();
const PORT=9000;

mongoose.connect("mongodb://127.0.0.1:27017/bolgify").then(()=>console.log("MongoDb connected"));
app.set('view engine','ejs');
app.set('views',path.resolve('./view'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())
app.use(validateTheUserCookie("token"));

app.use('/users',userRoutes)
app.use('/blogs',blogRoutes)
app.get('/',async (req,res)=>{
    const blogs = await Blog.find({})
    // console.log(blogs);
    res.render('home',{
        user:req.user,
        blogs: blogs
    })
})
app.get('/users/logout',(req,res)=>{
    res.clearCookie('token');
    res.render('home',{
        blogs: null

    })
})
app.listen(PORT,()=> console.log(`Server started at Port:${PORT}`))