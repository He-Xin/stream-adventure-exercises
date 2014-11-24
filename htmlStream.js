var trumpet = require('trumpet');
var tr = trumpet();

tr.pipe(process.stdout);

var stream = tr.select('.loud').createStream();

var through = require('through');

stream.pipe(through(function(buf){
    this.queue(buf.toString().toUpperCase());
})).pipe(stream);

process.stdin.pipe(tr);
