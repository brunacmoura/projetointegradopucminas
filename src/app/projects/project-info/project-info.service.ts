import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectInfoService {

  constructor() { }

  private projectSubject = new BehaviorSubject<any>(null);
  project$ = this.projectSubject.asObservable();

  private taskSource = new BehaviorSubject<any>(null);
  currentTask = this.taskSource.asObservable();
  
  setProject(project: any) {
    this.projectSubject.next(project);
  }

  setTask(task: any) {
    this.taskSource.next(task);
  }
}
