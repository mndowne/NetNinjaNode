
const fs = require('fs');

//reading files
//--------------------------------------------------------
/*
fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});
*/

// writing files
//--------------------------------------------------------
/*
fs.writeFile('./docs/blog1.txt', 'Hello, World', () => {
    console.log('file was written');
});

*/
// directories

if (!fs.existsSync('./assets')) {

    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder created');

    });

}


// deleting files
