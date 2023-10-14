import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ProjectInfoService } from './project-info.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent {

  constructor(private appServices: AppService, 
              private route: ActivatedRoute,
              private projectInfoService: ProjectInfoService,
              private router: Router){}
  
  project: any;
  isOverviewActive: boolean = false;

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const page = params.get('project') || '';
      this.appServices.getProjectByPage(page).subscribe(response => {
        this.isOverviewActive = true;
        this.project = response;
        this.projectInfoService.setProject(this.project);
        this.router.navigate(['./overview'], { relativeTo: this.route });
      })
    });
  }

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  isSidenavOpen = true;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenav.toggle();
  }

  goToProjectsPage(): void {
    this.router.navigate(['/projects']);
  }
}
