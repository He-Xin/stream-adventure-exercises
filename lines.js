var through = require('through');
var split = require('split');
var counter = 1;


process.stdin
    .pipe(split())
    .pipe(through(function (line) {
	if(counter%2 === 0)
	    this.queue(line.toString().toUpperCase());
	else
	    this.queue(line.toString().toLowerCase());
	this.queue('\n');
	counter++;
    }))
.pipe(process.stdout);


