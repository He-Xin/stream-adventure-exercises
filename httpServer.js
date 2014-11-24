var http = require('http');
var tr = require('through');

var server = http.createServer(function(req, res) {
    if (req.method === 'POST') {
	req.pipe(tr(function(buf) { this.queue(buf.toString().toUpperCase())})).pipe(res);
    } else {
	res.end('send me a post\n');
    }
});

server.listen(process.argv[2]);
