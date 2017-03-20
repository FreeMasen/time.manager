import { NgModule } from '@angular/core'
import { RouterModule, Route } from '@angular/router';

import { Dashboard } from '../dashboard/component'
import { TaskDetail } from '../taskDetail/component';
const routes: Route[] = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: Dashboard},
    {path: 'taskDetail/:id', component: TaskDetail}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class Router { }