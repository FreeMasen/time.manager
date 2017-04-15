import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router';

import { Dashboard } from '../dashboard/component'
import { TaskDetail } from '../taskDetail/component';
import { Settings } from '../settings/component';
const routes: Route[] = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: Dashboard},
    {path: 'taskDetail/:id', component: TaskDetail},
    {path: 'settings', component: Settings}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class Router { }