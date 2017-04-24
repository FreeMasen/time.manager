const fs = require('fs');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const sass = require('node-sass');



function watch(theme) {
    var compiler = webpack(config)

    compiler.watch(
        {aggregareTimeout: 300,
        poll: true},
        (err, stats) => {
            console.log(stats.toString("errors-only"))
        }
    )

    var style = 
        {inFile: './styles/main.sass',
        outFile: './style.css'}
    var colors = 
        {inFile: theme,
        outFile: './theme.css'}

    var styleWatcher = fs.watch('./styles/', (event, filename) => {
        if (filename.includes('main')) {
            compileSass(style.inFile, style.outFile);
        } else {
            compileSass(colors.inFile, colors.outFile);
        }
    });

}

function compileSass(infile, outfile) {

    sass.render({
        file: infile,
        // outputStyle: 'compressed'
    }, (err, result) => {
        if (err) return console.error('error rendering', infile, err);
        fs.writeFile(outfile, result.css, (err) => {
            if (err) return console.error('error writing', infile, 'to', outfile, err);
            console.log('wrote', infile, 'to', outfile);
        })
    })
}

var theme = './styles/_dark.sass';
if (process.argv[2] == 'light') {
    theme = './styles/_light.sass'
}


watch(theme);