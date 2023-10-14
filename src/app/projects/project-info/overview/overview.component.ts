import { Component } from '@angular/core';
import { ProjectInfoService } from '../project-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsDialogComponent } from './task-details-dialog/task-details-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag,
  CdkDropList, } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent{
  constructor(private projectInfoService: ProjectInfoService, 
              private router: Router, 
              private route: ActivatedRoute,
              private appServices: AppService,
              private dialog: MatDialog,
              private authService: AuthService){ }
  project: any;
  searchTask: string = '';
  tasks: any;
  loading: boolean = true;
  droppedColumnIndex: number = -1;

  ngOnInit() {
    this.initializeComponent();
  }

  private initializeComponent() {
    this.projectInfoService.project$.subscribe((project) => {
      this.project = project;
      const project_id = this.project._id.$oid;
      this.appServices.getTasksByProject(project_id).subscribe(response => {
        this.tasks = response;
        this.loading = false;
      });
    });
  }

  createTask() {
    this.router.navigate(['../create-task'], { relativeTo: this.route });
  }

  getTasksByStatus(status: string) {
    const statusObj = this.tasks.find((taskObj: any) => taskObj._id === status);

    return statusObj && statusObj.tasks ? statusObj.tasks : [];    
  }

  openTaskDetailsDialog(task: any): void {
    const dialogRef = this.dialog.open(TaskDetailsDialogComponent, {
      width: '500px',
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if (result.action == 'edit'){
          this.projectInfoService.setTask(result.task);
          this.router.navigate([`../edit/${result.task._id}`], { relativeTo: this.route });
        }
        if (result.action == 'delete'){
          this.loading = true;
          this.initializeComponent();
        }
      }
    });
  }

  enter(i: number) {
    this.droppedColumnIndex = i;
  }

  drop(event: CdkDragDrop<any>) {
    const task = event.item.data.task;
    const initialTaskStatus = task.status
    const finalTaskStatus = this.project.status[this.droppedColumnIndex]
    if (initialTaskStatus !== finalTaskStatus){
      this.loading = true;
      const body = {
        newStatus: finalTaskStatus
      };
      this.appServices.editTaskStatus(body, task._id).subscribe(response => {
        this.initializeComponent();
      })
    }
  }

  signout() {
    this.authService.logout();    
  }

}
