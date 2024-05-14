const axios = require('axios');
const fs = require('fs');

function cat(path, toConsole=true) {
    
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.log('ERROR:', err);
                reject(err);
            }
            
            if (toConsole) {
                console.log(data);
            } else {
                return resolve(data);
            }
        });
    });
}

async function webCat(url, toConsole = true) {
    try {
        const resp = await axios.get(url);
        if (toConsole) {
            console.log(resp.data);
        } else {
            return resp.data;
        }

    } catch (e) {
        console.log('Error fetching: ', url)
        console.log('Error:', e.message);
        process.kill(2);
    }
}

function writeTo(path, content) {
    fs.writeFile(path, content, 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR:', err);
            process.kill(3);
        }

        console.log('write to a file complete!');
    })
}
for (let i = 0; i < process.argv.length; i++) {
    if (process.argv.length == 3 && process.argv[i].indexOf('.txt') != -1) {
        cat(process.argv[i], true);
    } else if (process.argv.length == 3 && process.argv[i].indexOf('http://') != -1) {
        webCat(process.argv[i]);
    } else if (process.argv.length == 5 && process.argv[i] == '--out' && process.argv[i + 2].indexOf('.txt') != -1) {
        const writeToFile = process.argv[i + 1];
        cat(process.argv[i + 2], false).then(content => writeTo(writeToFile, content));
        
    } else if (process.argv.length == 5 && process.argv[i] == '--out' && process.argv[i + 2].indexOf('http://') != -1) {
        const writeToFile = process.argv[i + 1];
        webCat(process.argv[i + 2], false).then(content => writeTo(writeToFile, content));
       
    }
}

