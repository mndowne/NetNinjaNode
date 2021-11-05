const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    console.log(req.url, req.method);

    // set header content type
    res.setHeader('Contenet-Type', 'text/html');


    // send an html file
    fs.readFile('./views/index.html', (err,data) => {
        if (err) {

            consloe.log(err);
            res.end();

        } 
        else {

        res.end(data);

        }
        
    })
});

server.listen(3000, 'localhost', () => {

    console.log('listening for requests on port 3000');

});
