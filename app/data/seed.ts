import { Task, Work, Client, Category } from '../models';
var Id = require('crypto').randomBytes;
export class Seed {

    tasks(): Task[] {
        var _mocks: Task[] = [];
        var _objectives =  [
            'QA New feature',
            'Build initial Spec',
            'Develop use case',
            'Implement new feature',
            'Email someone about a thing',
            'Make this phone call',
            'Buy Eggs',
            'Bury the hatchet',
            'Read Crime and Punishment',
            'Implement light theme'
        ];

        var _notes = [
            'This is a note',
            'Notes are a great way to add more information to a task',
            'Some things to keep in mind...',
            `Do not for get about this!`,
            'More information is important'
        ];

        for (var i = 0;i<10;i++) {
            var workNumber = this.rnd(0, 5);
            var notes = [];
            var objective = _objectives[i]
            
            var notes = [];
            for (var h = 0; h < this.rnd(0, 10); h++) {
                var noteIndex = this.rnd(0, _notes.length);
                var note = _notes[noteIndex];
                notes.push(`${note}`);
            }
            var clientName = this.clientNames[this.rnd(0,this.clientNames.length - 1)];
            var catName = this.categoryNames[this.rnd(0,this.categoryNames.length - 1)];
            _mocks.push(new Task(undefined, objective, new Date(), notes, null, new Category(catName), new Client(clientName)));
        }
        console.log('returning')
        console.log(_mocks);
        return _mocks;
    }

    work(taskId: string): Work[] {
        var workNumber = this.rnd(0, 5);
        var ret = [];
        for (var j = 0;j<workNumber;j++) {
            var daysInPast = this.rnd(0, 5)
            var dt = new Date()
            dt.setDate(new Date().getDate() - daysInPast);
            var duration = this.rnd(0, 60);
            ret.push(new Work(taskId, dt, duration));
        }
        console.log('returing', ret);
        return ret;
    }

    rnd(min, max): number {
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
    ];

    categories(): Category[] {
        return this.categoryNames.map(category => {
            return new Category(category);
        })
    }

    clientNames = [
        'Wonka Industries',
        'Acme Corp.',
        'Stark Industries',
        'Ollivander\'s Wand Shop',
        'Gekko & Co',
        'Wayne Enterprises',
        'Cyberdyne Systems',
        'Sam Malone',
        'Genco Pura Olive Oil Company',
        'The New York Inquirer',
        'Duff Beer',
        'Bubba Gump',
        'Olivia Pope & Associates',
        'Krusty Krab',
        'Sterling Cooper',
        'Soylent',
        'Hooli',
        'Good Burger',
        'Initech'
    ]

    clients(): Client[] {
        return this.clientNames.map(client => {
            return new Client(client);
        })
    }
}