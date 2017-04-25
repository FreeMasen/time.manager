import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router';

import { Dashboard } from '../dashboard/component'
import { TaskDetail } from '../taskDetail/component';
import { Settings } from '../settings/component';
import { Calendar } from '../calendar/component';

const routes: Route[] = [
    {path: '', redirectTo: 'calendar', pathMatch: 'full'},
    {path: 'dashboard', component: Dashboard},
    {path: 'taskDetail/:id', component: TaskDetail},
    {path: 'settings', component: Settings},
    {path: 'calendar', component: Calendar}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class Router { }