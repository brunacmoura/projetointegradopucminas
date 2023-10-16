import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppApi {

  private apiUrl = 'https://projetopucgerenciamentodeprojetospos.azurewebsites.net';
  user: any;
  
  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/auth/login`
    return this.http.post<any>(url, loginData).pipe(
      catchError((err) => {
        return throwError(err)
      })
    )
  }

  getProjects(): Observable<any> {
    const url = `${this.apiUrl}/projects/`
    return this.http.get<any>(url).pipe(
      catchError((err) => {
        return throwError(err)
      })
    )
  }

  getProjectByPage(page: string): Observable<any> {
    const url = `${this.apiUrl}/projects/${page}`
    return this.http.get<any>(url).pipe(
      catchError((err) => {
        return throwError(err)
      })
    )
  }

  getTasksByProject(project_id: string): Observable<any> {
    const url = `${this.apiUrl}/tasks/${project_id}`
    return this.http.get<any>(url).pipe(
      catchError((err) => {
        return throwError(err)
      })
    )
  }

  getMembers(): Observable<any> {
    const url = `${this.apiUrl}/generals/members`
    return this.http.get<any>(url).pipe(
      catchError((err) => {
        return throwError(err)
      })
    )
  }

  getTags(): Observable<any> {
    const url = `${this.apiUrl}/generals/tags`
    return this.http.get<any>(url).pipe(
      catchError((err) => {
        return throwError(err)
      })
    )
  }

  createProject(projectData: any): Observable<any> {
    const url = `${this.apiUrl}/projects/create`;
    projectData["owner"] = this.user;
    return this.http.post<any>(url, projectData).pipe(
      catchError((err) => {
        return throwError(err)
      })
    )
  }

  createTask(taskData: any): Observable<any> {
    const url = `${this.apiUrl}/tasks/create`;
    taskData["owner"] = this.user;
    return this.http.post<any>(url, taskData).pipe(
      catchError((err) => {
        return throwError(err)
      })
    )
  }

  editTaskStatus(newStatus: any, taskId: any) {
    const url = `${this.apiUrl}/tasks/update_status/${taskId}`
    const taskData = {
      newStatus: newStatus,
      owner: this.user
    }
    return this.http.put<any>(url, taskData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  editTask(changes: any, taskId: any) {
    const url = `${this.apiUrl}/tasks/update/${taskId}`
    const taskData = {
      changes: changes,
      owner: this.user
    }
    return this.http.put<any>(url, taskData).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  removeTask(taskId: any) {
    const url = `${this.apiUrl}/tasks/remove/${taskId}`
    const params = { owner: this.user };
    return this.http.delete<any>(url, { params }).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  setUser(user: any) {
    this.user = user
  }

}
