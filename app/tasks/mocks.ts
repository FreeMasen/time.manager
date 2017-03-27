import { Task } from '../models';
import { Work } from '../models';

export function Mocks(): Task[] {
    var _mocks = [];
    var _objectives: string[] =  [
        'QA New feature',
        'Build initial Spec',
        'Develop working model',
        'Implement new feature'
    ];
    var _notes: string[] = [
        'This is a note',
        'Notes are a great way to add more information to a task',
        'Some things to keep in mind...',
        `Don't for get about this!`,
        'More information is important'
    ]
    for (var i = 0;i<25;i++) {
        var workNumber = rnd(0, 5);
        var work: Work[] = [];
        var notes: string[] = [];
        for (var j = 0;j<workNumber;j++) {
            var daysInPast = rnd(0, 5)
            var workDate = new Date()
            workDate.setDate(workDate.getDate() - daysInPast);   
            work.push(new Work(`${i}${j}`, workDate, rnd(1, 30)));
        }
        for (var h = 0; h < rnd(0, 10); h++) {
            notes.push(_notes[rnd(0, _notes.length)]);
        }
        var objective: number = rnd(0, 3);
        _mocks.push(new Task(`task${i}`,_objectives[objective], null, notes, work));
    }
    return _mocks;
}

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}