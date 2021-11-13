const express = require('express');

// express app
const app = express();


// this is if we wanted to change the default views location. 
//app.set('views','NotDefaultFolder');

// listen for requests
app.listen(3000);

//middleware & static files


//routes
app.get('/', (req, res) => {
    res.sendFile('./chapter_1/index.html', { root: __dirname }); 
});


