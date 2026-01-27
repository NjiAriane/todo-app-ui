import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import Task from '../../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl: string= environment.ApiUrl;
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }
  getTaskById(id: number) {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
  }
  createTask(task: any) {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }
  updateTask(task: any) {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${task._id}`, task);
  }
  deleteTask(id: string) {
    return this.http.delete<Task>(`${this.baseUrl}/tasks/${id}`);
  }
}
