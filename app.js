const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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

/*
//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title : 'new blog',
        snippet: 'about my new blog',
        body: 'more about the blog'

    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});


app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});



app.get('/single-blog', (req, res) => {
    Blog.findById('618853444b8118df05f8dde0')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});
*/


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about' ,{title:'About'});

});


// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog( req.body );

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    });

});

app.get('/blogs/:id', (req,res) => {
    const id = req.params.id
    console.log(id);
    Blog.findById(id)
    .then(result => {
        res.render('details', {blog: result, title: 'Blog Details'});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
    res.render('create' ,{title:'Create New Blog'});

});

/*
// redirects
app.get('/about-us', (req,res) => {
    res.redirect('/about');
});
*/

// 404 page
app.use((req,res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', {title:'404'});
});


