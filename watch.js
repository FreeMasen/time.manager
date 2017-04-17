const exec = require('child_process').exec;


function watch(cssFileNames) {
    var webpack = 'webpack --watch'
    var sass = [];
    cssFileNames.forEach(element => {
        sass.push(`node-sass ${element.inFile} ${element.outFile}`)
    });
    exec(webpack,report);
    sass.forEach(cmd => {
        exec(cmd, report);
    })
}

function report(err, stdout, stderr) {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    if (err) process.exit(err);
}

var theme = './styles/_dark.sass';
if (process.argv[2] == 'light') {
    theme = './styles/_light.sass'
}

var cssFileNames = [
    {inFile: './styles/main.sass',
    outFile: './style.css'},
    {inFile: theme,
    outFile: './theme.css'}
]

watch(cssFileNames);