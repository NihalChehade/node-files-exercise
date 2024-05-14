const axios = require('axios');
const fs = require('fs');

function cat(path) {

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR:', err);
            process.kill(1);
        }

        console.log(data);
    })
}

async function webCat(url) {
    try {
        const resp = await axios.get(`${url}`);
        console.log(resp.data);
    } catch (e) {
        console.log('Error fetching: ', url)
        console.log('Error:', e.message);
        process.kill(2);
    }
}
if (process.argv.length == 3 && process.argv[2].indexOf('.txt') != -1) {
    cat(process.argv[2]);
} else if (process.argv.length == 3 && process.argv[2].indexOf('http://') != -1) {
    webCat(process.argv[2]);
}