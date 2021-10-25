import { Component } from '@angular/core';
import { TaskService } from './Services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Board';
  constructor(private taskService: TaskService) {}
  change() {
    this.taskService.editButton.next(true);
  }
}
