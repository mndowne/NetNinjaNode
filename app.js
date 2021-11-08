const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbUser = 'mongodb+srv://mndowne:zzkcRHt84yEAxE3@cluster0.hy8gz.mongodb.net/Node-Tutorial?retryWrites=true&w=majority'
mongoose.connect(dbUser).then((result) =>
    app.listen(3000)).catch((err) => console.log(err)
);


// register view engine
app.set('view engine','ejs')

// this is if we wanted to change the default views location. 
//app.set('views','NotDefaultFolder');

// listen for requests
//app.listen(3000);

//middleware & static files
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about' ,{title:'About'});

});
/*
// redirects
app.get('/about-us', (req,res) => {
    res.redirect('/about');
});
*/

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req,res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', {title:'404'});
});


