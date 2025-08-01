import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  priority: string;
  completed: boolean;
}

@Injectable()
export class TaskService {
  private api = 'http://localhost:3001/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  addTask(title: string, priority: 'low' | 'medium' | 'high'): Observable<Task> {
    return this.http.post<Task>(this.api, { title, priority }); 
  }

  updateTaskStatus(id:number, completed: boolean): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, {completed});
  }
}