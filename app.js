const express = require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const blogRoutes= require('./routes/blogRoutes')
//express app
const app=express();

//connect to mongodb server
const dbURI="mongodb+srv://UwihanganyeObed:Sun123@cluster0.gvdipjg.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((error)=>console.log(error));

//register view engine

app.set('view engine','ejs');

//middleware $ static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/',(req,res)=>{
res.redirect('/blogs');
});

app.get('/about',(req,res)=>{

   res.render('about',{title: 'About Page'});


});

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req,res)=>{
   res.status(404).render('404',{title: '404'});
});

