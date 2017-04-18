import { Task, Work, Client, Category } from '../models';
export class Seed {

    tasks(): Task[] {
        var _mocks: Task[] = [];
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
            var workNumber = this.rnd(0, 5);
            var work = [];
            var notes = [];
            var objective = _objectives[this.rnd(0, _objectives.length -1)]
            for (var j = 0;j<workNumber;j++) {
                var daysInPast = this.rnd(0, 5)
                var dt = new Date()
                dt.setDate(new Date().getDate() - daysInPast);
                var duration = this.rnd(0, 60);
                work.push(new Work(null, dt, duration));
            }
            var notes = [];
            for (var h = 0; h < this.rnd(0, 10); h++) {
                var noteIndex = this.rnd(0, _notes.length);
                var note = _notes[noteIndex];
                notes.push(`${note}`);
            }
            _mocks.push(new Task(undefined, objective, new Date(), notes, work, null));
        }
        console.log('returning')
        console.log(_mocks);
        return _mocks;
    }

    rnd(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    categoryNames: string[] = [
'Business Development',
'Community Service',
'Conference/Workshop',
'Consultation',
'Contracts',
'Data analysis',
'Data collection',
'Data entry',
'Data processing',
'Database management',
'Document Analysis',
'eBillity Summary',
'General',
'Graphics',
'Hardware/Software maintenance',
'HIPAA',
'Hiring process',
'Instrument development',
'Key Informant Interviews',
'Lit review/research',
'Logic models',
'Meetings',
'Planning/design',
'Presentation & publication',
'Programming / development',
'Project management',
'Proposals',
'Quality Assurance / Testing',
'Reporting',
'Sampling',
'Site visit',
'Social media',
'Special requests',
'Survey design',
'Survey management',
'Survey materials processing',
'Tech assist',
'Telephone survey calls',
'Training/Management',
'Travel time',
'Vendor coordination'
]
categories(): Category[] {
    return this.categoryNames.map(category => {
        return new Category(category);
    })
}


    

clients(): Client[] {
    var names = [];
    for (var i = 0; i < 25; i++) {
        names.push(`Client ${i}`)
    }
    return names.map(client => {
        return new Client(client);
    })
}
}