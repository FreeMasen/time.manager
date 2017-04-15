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

clientNames = [
    'Barr Center',
'Crossley SSI',
'CW Media',
'CW NQDW',
'CW Research',
'CW17 CEG Evaluation',
'CW17 Database Management and Archiving',
'CW17 Project Management &amp; Meetings',
'CW17 Publications and Presentations',
'CW17 QP2 Ad Hoc Analyses',
'CW17 QP2 Ad Hoc Media Analysis',
'CW17 QP2 Outcome Study',
'CW17 QP2 Re-engagement Protocol Evaluatio',
'CW17 QP2 Spanish Language Texting',
'CW17 Special Projects',
'CW17 Systems Change Evaluation',
'F15 AHEC',
'F15 AHEC low attendance',
'F15 AHEC secret shopper',
'F15 CareerSource',
'F15 CRM',
'F15 CRM Eval',
'F15 eReferral CHD',
'F15 eReferral CS',
'F15 eReferral Optum',
'F15 eReferral UF',
'F15 FSU',
'F15 General',
'F15 Ind Srvs Satis',
'F15 Ind Srvs Util',
'F15 Preg Tob',
'F15 QLWC',
'F15 Qtly Reports',
'F15 Quit Surveys',
'F15 Synthesis',
'F15 THW',
'GCG',
'Gillette Children\'s Hospital',
'Grant, Jon',
'Hazelden Bullying Support',
'Hazelden WhitePaper',
'Health Partners Institute',
'HI16 CG',
'HI16 Gen',
'HI16 QL',
'John Sandness',
'MDH CIQ',
'NAQC',
'NAQC Annual Survey Analysis',
'ND16 Baby &amp; Me Eval',
'ND16 Eval Planning',
'ND16 FY15 Final Report',
'ND16 FY16 Final Report',
'ND16 Meetings with NDDoH',
'ND16 Million Hearts Eval',
'ND16 NDQuits Ad Hoc',
'ND16 NDQuits Data Management',
'ND16 NDQuits Eval',
'ND16 NDQuits Survey Managemant',
'ND16 Project Management',
'North Dakota Media',
'OH1422 Data Collection',
'OH1422 Eval Planning',
'OH1422 Local TA',
'OH1422 Proj Mgmt',
'OH1422 Reporting',
'OH1422 Site Visits',
'OH1422 Sustain',
'OH1422 TA',
'Ohio 2014',
'Ohio Cancer',
'Ohio CHC ECOPP',
'OK FY17',
'OK FY17 Evaluation',
'OK HCH',
'Park Nicollet',
'PDA Bookkeeping',
'PDA General',
'PDA Meetings',
'PDA Service/Pro Bono',
'Ramsey Cty Corrections',
'Science Education',
'Spine Deformity Journal',
'Time Off',
'Time Off:Bereavement',
'Time Off:Holiday',
'Time Off:Jury Duty',
'Time Off:Sick/Personal Time',
'Time Off:Time off w/o pay',
'Time Off:Vacation',
'Twin Cities Spine Center'];

clients(): Client[] {
    return this.clientNames.map(client => {
        return new Client(client);
    })
}
}