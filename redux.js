var duplexer = require('duplexer');
var through = require('through');

module.exports = function (counter) {
    var counts = {};

    var tr = through(function(row){
	counts[row.country] = (counts[row.country] || 0) + 1;
    }, function(){
	counter.setCounts(counts);
    });

    return duplexer(tr, counter);
}
