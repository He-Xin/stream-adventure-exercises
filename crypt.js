var crypt = require('crypto');

var stream = crypt.createDecipher('aes256', process.argv[2]);

process.stdin.pipe(stream).pipe(process.stdout);
