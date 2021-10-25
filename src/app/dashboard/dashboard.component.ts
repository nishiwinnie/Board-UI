import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreateTaskComponent } from './createtask/createtask.component';
import { Task } from '../Model/task.model';
import { TaskService } from '../Services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  groupTask = {
    NewTask: [],
    Working: [],
    InReview: [],
    Completed: [],
  };
  allTask = [];
  temp: boolean = false;
  constructor(
    public dialog: MatDialog,
    public taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {
    this.taskService.editButton.subscribe(val => {
      this.temp = val;
    });
  }
  ngOnInit() {
    this.taskService.getAllTask().subscribe((response: Task[]) => {
      console.log(response);
      response.forEach((result) => {
        this.groupTask[result.status].push(result);
      });
    });
  }
  change() {
    this.taskService.editButton.next(false);
  }
  addCard(data): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '50%',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result: Task) => {
      console.log('The dialog was closed');
      if (result) {
        if (data['taskName']) {
          this.taskService.updateTask(result).subscribe((response) => {
            let msg = 'Update failed';
            if (response != null) {
              console.log(response);
              if (result.status != data.status) {
                this.groupTask[data.status] = this.groupTask[
                  data.status
                ].filter((item) => item != data);
                this.groupTask[result.status].push(result);
              } else {
                data = result;
              }
              msg = 'Changes Updated';
            }
            this._snackBar.open(msg, '', {
              duration: 4000,
            });
            console.log('update completed');
          });
        } else {
          this.taskService.createTask(result).subscribe((response) => {
            let msg = 'failure';
            console.log('Added', response);
            if (response) {
              this.groupTask[result.status].push(response);
              msg = 'success';
            }
            this._snackBar.open(msg, '', {
              duration: 4000,
            });
          });
        }
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let temp = event.previousContainer.data[event.previousIndex];
      console.log(event.previousIndex);
      temp.status = event.container.id;
      this.taskService.updateTask(temp).subscribe((result) => {
        if (result) {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
          //event.container.data[event.currentIndex].status = event.container.id;
          console.log(event.container.data);
        } else {
          temp.status = event.previousContainer.id;
        }
      });
    }
  }
}
