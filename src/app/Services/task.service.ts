import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../Model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  editButton = new BehaviorSubject<boolean>(false);

  createTask(task: Task) {
    return this.http.post<Task>(
      'https://localhost:5001/api/task/addTask',
      task
    );
  }
  getAllTask() {
    return this.http.get('https://localhost:5001/api/task/getTask');
  }
  updateTask(task: Task) {
    return this.http.put<Task>(
      'https://localhost:5001/api/task/updateTask',
      task
    );
  }
}
