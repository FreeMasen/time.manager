import { Task } from '../models/task';
import { Work } from '../models/work';

function getMocks(): Task[] {
    var _mocks = [];
    var _objectives: string[] =  [
        'QA New feature',
        'Build initial Spec',
        'Develop working model',
        'Implement new feature'
    ];
    for (var i = 0;i<25;i++) {
        var workNumber = Math.floor(Math.random() * (5 - 0));
        var work: Work[] = [];
        for (var j = 0;j<workNumber;j++) {
            var daysInPast = Math.floor(Math.random() * (5 - 0) + 0)
            var workDate = new Date()
            workDate.setDate(workDate.getDate() - daysInPast);   
            work.push(new Work(`${i}${j}`, workDate, Math.floor(Math.random() * (30 -1) + 1)))
        }
        var objective: number = Math.floor(Math.random() * (3 - 0));
        _mocks.push(new Task(`${i}`,_objectives[objective], null, null, work));
    }
    return _mocks;
}

export var Mocks: Task[] = getMocks();