const fs = require('fs')


function createNewComponent(name) {
    console.log('ensuring app folder exists')
    var path = `app/${name.toLowerCase()}`;
    if (ensureDirectory()) {
        console.log('app folder exists creating ' + path)
        fs.mkdir(path, (err) => {
            if (err) process.exit(err);
            console.log('component folder created')
            console.log('creating style.css')
            fs.writeFileSync(`${path}/style.css`, '');
            console.log('createing template.html')
            fs.writeFileSync(`${path}/template.html, ''`);
            console.log('creating component.ts')
            fs.writeFileSync(`${path}/component.ts`, generateComponentText(name));
            console.log('complete');
        })
    }
}

function generateComponentText(name) {
    return `import { Component } from '@angular/core';\n` +
            `\n` +
            `\n` +
            `@Component({\n`+
            `    selector: '<${name.toLowerCase()}>',\n`+
            `    templateUrl: './template.html',\n`+
            `    styleUrls: ['./style.css']\n`+
            `})\n` +
            `export class ${name} {\n`+
            `    \n` +
            `    constructor() {\n`+
            `        \n`+
            `    }\n`+
            `}`
}

function ensureDirectory() {
    if (!fs.existsSync('app')) {
        try {
            fs.mkdirSync('app');
            return true
        } catch (e) {
            return false;
        }
    }
    return true;
}

if (process.argv[2]) {
    var name = process.argv[2];
    if (name.includes('/')
        || name.includes('\\')
        || name.includes('.')) {
            console.error('Cannot include /,\\ or . in your component name');
            process.exit();
        }
    console.log('Attempting to create ' + name)
    createNewComponent(name)
}