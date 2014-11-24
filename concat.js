var cs = require('concat-stream');

process.stdin.pipe(cs(function(data) {
    console.log(data.toString().split('').reverse().join(''));
}))
