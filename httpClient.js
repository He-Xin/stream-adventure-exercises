var req = require('request');

var r = req.post('http://localhost:8000');

process.stdin.pipe(r).pipe(process.stdout);
