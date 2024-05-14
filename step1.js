
const fs = require('fs');

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log('ERROR:', err);
            process.kill(1);
        }
       
            console.log(data);
        });
}
 
if(process.argv.length == 3 && process.argv[2].indexOf('.txt') != -1){
       
    cat(process.argv[2]);
}
