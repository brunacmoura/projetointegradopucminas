import { Injectable } from '@angular/core';
import { AppApi } from './app.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private appApi: AppApi) { }

  getProjects(): Observable<any> {
    return new Observable(observer => {
      this.appApi.getProjects().subscribe(
        value => {
          observer.next(value)
        },
        error => {
          observer.next(null)
        }
      )
    })
  }

  getProjectByPage(page: string): Observable<any> {
    return new Observable(observer => {
      this.appApi.getProjectByPage(page).subscribe(
        value => {
          observer.next(value)
        },
        error => {
          observer.next(null)
        }
      )
    })
  }

  getTasksByProject(project_id: string): Observable<any> {
    return new Observable(observer => {
      this.appApi.getTasksByProject(project_id).subscribe(
        value => {
          observer.next(value)
        },
        error => {
          observer.next(null)
        }
      )
    })
  }

  getMembers(): Observable<any> {
    return new Observable(observer => {
      this.appApi.getMembers().subscribe(
        value => {
          observer.next(value)
        },
        error => {
          observer.next(null)
        }
      )
    })
  }

  getTags(): Observable<any> {
    return new Observable(observer => {
      this.appApi.getTags().subscribe(
        value => {
          observer.next(value)
        },
        error => {
          observer.next(null)
        }
      )
    })
  }

  createProject(body: any) {
    return new Observable<any>((observer) => {
      this.appApi.createProject(body).subscribe(
        next => {
          observer.next(next)
        },
        error => {
          observer.next(error.error.code)
        }
      )
    })
  }

  createTask(body: any) {
    return new Observable<any>((observer) => {
      this.appApi.createTask(body).subscribe(
        next => {
          observer.next(next)
        },
        error => {
          observer.next(error.error.code)
        }
      )
    })
  }

  editTaskStatus(newStatus: any, taskId: any) {
    return new Observable<any>((observer) => {
      this.appApi.editTaskStatus(newStatus, taskId).subscribe(
        next => {
          observer.next(next)
        },
        error => {
          observer.next(error.error.code)
        }
      )
    })
  }

  editTask(changes: any, taskId: any) {
    return new Observable<any>((observer) => {
      this.appApi.editTask(changes, taskId).subscribe(
        next => {
          observer.next(next)
        },
        error => {
          observer.next(error.error.code)
        }
      )
    })
  }

  removeTask(taskId: any) {
    return new Observable<any>((observer) => {
      this.appApi.removeTask(taskId).subscribe(
        next => {
          observer.next(next)
        },
        error => {
          observer.next(error.error.code)
        }
      )
    })
  }
}
