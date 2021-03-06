const Database = require('../../src/database.js');
const FunctionSerializer = require('../../src/functionSerializer');
const { MenuItem } = require('electron');
const randomBytes = require('crypto').randomBytes;

var fs = require('fs');
var DataFileNames = fs.readdirSync('./assets/data');
DataFileNames.forEach(fileName => {
    console.log(fileName);
    if (fileName.includes('.db')) {
        fs.unlinkSync(`./assets/data/${fileName}`);
    }
})

const db = new Database('time.manager', ['menu', 'tasks']);


var menuTemplate = [
    {
        _id: '1',
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, win) {
                    win.webContents.loadURL(win.baseURL);
                }
            },
            {
                role: 'close'
            },
            {
                role: 'quit'
            }
        ]
    },
    {
        _id: '2',
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            }
        ]
    },
    {
        _id: '3',
        label: 'View',
        submenu: [
        ]
    }
]

function Mocks() {
    var _mocks = [];
    var _objectives =  [
        'QA New feature',
        'Build initial Spec',
        'Develop working model',
        'Implement new feature'
    ];
    var _notes = [
        'This is a note',
        'Notes are a great way to add more information to a task',
        'Some things to keep in mind...',
        `Do not for get about this!`,
        'More information is important'
    ]
    for (var i = 0;i<25;i++) {
        var task = {};
        task._id = '-1';
        var workNumber = rnd(0, 5);
        task.work = [];
        task.notes = [];
        task.objective = _objectives[rnd(0, _objectives.length -1)]
        for (var j = 0;j<workNumber;j++) {
            var work = {};
            var daysInPast = rnd(0, 5)
            var dt = new Date()
            dt.setDate(new Date().getDate() - daysInPast);
            work.start = dt;
            work.duration = rnd(0, 60);
            task.work.push(work);
        }
        var notes = [];
        for (var h = 0; h < rnd(0, 10); h++) {
            var noteIndex = rnd(0, _notes.length);
            var note = _notes[noteIndex];
            notes.push(`${note}`);
        }
        task.notes = notes;
        task.created = new Date();
        _mocks.push(task);
    }
    return _mocks;
}

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

var mocks = Mocks();

function insertDocs(docs) {
    if (docs.length < 1) return;
    var doc = docs.splice(0,1);
    db.tasks.insert(doc, (err, doc) => {
        if (err) throw err;
        insertDocs(docs);
    })
}

insertDocs(mocks)

fs.writeFileSync('testa.json', JSON.stringify(mocks));

db.menu.insert(menuTemplate, (err, doc) => {
    if (err) return console.log('Menu Seed Error: ', err);
    if (doc) //console.log('inserted menuitems', doc)
    db.tasks.insert(mocks, (err, docs) => {
        if (err) return console.log('Tasks Seed Error: ', err);
        if (docs) //console.log('inserted tasks: ', docs)
        testInsert();
    })
})

// function testInsert() {
//     db.menu.find({}, (err, docs) => {
//         if (err) throw err;
//         console.log('menu: ', docs);
//         db.tasks.find({}, (err, docs) => {
//             fs.writeFileSync('testb.json', JSON.stringify(docs));
//             if (err) throw err;
//             docs.forEach(doc => {
//                 for (var k in doc) {
//                     //console.log(doc[k]);
//                 }
//             })
//         })
//     })
// }