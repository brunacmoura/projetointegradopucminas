import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  view = 'form';

  projects: Array<any> = [];
  loading = true;
  
  constructor(private appService: AppService, 
              private authService: AuthService,
              public router: Router) 
              {   this.loading = true;
                  this.appService.getProjects().subscribe(response => {
                    this.projects = response;
                    this.loading = false
                  })
              }

  signout() {
    this.authService.logout();    
  }

  doToggleView() {
    this.view = this.view === 'form' ? 'select' : 'form';
  }

  goToProjectInfoPage(projectPage: string){
    this.router.navigate([`/projects/${projectPage}`]);
  }

  goToCreateProjectPage(){
    this.router.navigate([`/create-project`])
  }
}
