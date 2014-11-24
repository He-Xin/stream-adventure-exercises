var crypto = require('crypto');
var decrypt = crypto.createDecipher(process.argv[2], process.argv[3]);
var through = require('through');
var tar = require('tar');
var parser = tar.Parse();
var zlib = require('zlib');

parser.on('entry', function(e) {
    if (e.type !== 'File') return;
    
    var h = crypto.createHash('md5', { encoding: 'hex' });
    e.pipe(h).pipe(through(null, end)).pipe(process.stdout);
    
    function end () { this.queue(' ' + e.path + '\n') }

});

process.stdin
.pipe(decrypt)
.pipe(zlib.createGunzip())
.pipe(parser);
