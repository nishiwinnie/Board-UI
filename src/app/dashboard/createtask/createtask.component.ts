import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css'],
})
export class CreateTaskComponent implements OnInit {
  createTaskForm: FormGroup;
  temp: boolean;
  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private d: DatePipe,
    private taskService: TaskService
  ) {
    this.taskService.editButton.subscribe((val) => {
      this.temp = val;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data['taskName']) {
      //console.log(this.data['taskName']);
      this.createTaskForm = new FormGroup({
        taskName: new FormControl(this.data['taskName'], [Validators.required]),
        type: new FormControl(this.data['type'], [Validators.required]),
        taskDetails: new FormControl(this.data['taskDetails'], [
          Validators.required,
        ]),
        assignedTo: new FormControl(this.data['assignedTo'], [
          Validators.required,
        ]),
        startDate: new FormControl(this.data['startDate'], [
          Validators.required,
        ]),
        endDate: new FormControl(this.data['endDate'], [Validators.required]),
        status: new FormControl(this.data['status'], [Validators.required]),
      });
    } else {
      this.createTaskForm = new FormGroup({
        taskName: new FormControl('Bug Fix', [Validators.required]),
        type: new FormControl('bug', [Validators.required]),
        taskDetails: new FormControl('Check the bug', [Validators.required]),
        assignedTo: new FormControl('Mr X', [Validators.required]),
        startDate: new FormControl(this.d.transform(new Date(), 'yyyy-MM-dd'), [
          Validators.required,
        ]),
        endDate: new FormControl(this.d.transform(new Date(), 'yyyy-MM-dd'), [
          Validators.required,
        ]),
        status: new FormControl(this.data['status'], [Validators.required]),
      });
    }
  }
}
