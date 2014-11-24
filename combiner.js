var combiner = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function() {
    var current;
    var genres = [];
    return combiner(split(), through(function(row) {
	if (row.length === 0) return;
	var obj = JSON.parse(row);
	if (obj.type==='genre') {
	    var genre = obj.type;
	    current = {
		name : obj.name,
		books : []
	    };
	    genres.push(current);
	} else {
	    current.books.push(obj.name);
	}
	
    }, function(){
	var self = this;
	genres.forEach(function(obj) {
	    self.queue(JSON.stringify(obj) + '\n');
	});
	self.queue(null);
    }), zlib.createGzip());
}
