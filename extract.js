var read = require('fs').createReadStream
var unpack = require('tar-pack').unpack
read(process.cwd() + '/test.tar.gz')
    .pipe(unpack(__dirname + '/package/', function (err) {
        if (err) console.error(err.stack)
        else console.log('done')
    }))