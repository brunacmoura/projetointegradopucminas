import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { ProjectInfoComponent } from './projects/project-info/project-info.component';
import { OverviewComponent } from './projects/project-info/overview/overview.component';
import { CreateTaskComponent } from './projects/project-info/overview/create-task/create-task.component';
import { EditTaskComponent } from './projects/project-info/overview/edit-task/edit-task.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'projects', component: ProjectsComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'create-project', component: CreateProjectComponent }, 
{ path: 'projects/:project', 
  component: ProjectInfoComponent, 
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'create-task', component: CreateTaskComponent },
    { path: 'edit/:taskId', component: EditTaskComponent }, 
  ]},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
