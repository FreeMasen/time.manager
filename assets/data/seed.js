const Ned = require('nedb');

const work = new Ned({
    filename: `assets/data/time.manager.work.db`,
    timestampData: true
});
console.log(work.filename)

const menu = new Ned({
    filename: `assets/data/time.manager.menu.db`
})

work.loadDatabase(err => {
    console.error('Work Error: ', err);
})

menu.loadDatabase(err => {
    if (err) return console.error('Menu Error: ', err)
    menu.insert([{
        label: 'File',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
        focusedWindow.loadUrl(__dirname + '/index.html');
        }
    },{
        label: 'Close Window',
        accelerator: 'CmdOrCtrl+W',
        click(item, focusedWindow) {
            focusedWindow.close();
        }
        },{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click(item, focusedWindow) {
            app.quit();
        }
        }], (err, doc) => {
            if (err) return console.log('Menu Seed Error: ', err);
            if (doc) console.log(doc)
        })
})

