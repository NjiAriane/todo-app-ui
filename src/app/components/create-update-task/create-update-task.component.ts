import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import Task from '../../models/Task';
import {TaskService} from '../../services/task/task.service';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-create-update-task',
  imports: [
    ReactiveFormsModule,
    Toast
  ],
  templateUrl: './create-update-task.component.html',
  styleUrl: './create-update-task.component.css',
  standalone: true,
  providers: [MessageService],
})
export class CreateUpdateTaskComponent implements OnInit {

  taskForm!: FormGroup;

  constructor(private taskService: TaskService, private messageService: MessageService) {
  }

  @Input()
  task: Task | undefined = undefined;

  @Output()
  taskCreated = new EventEmitter<Task>();
  @Output()
  taskUpdated = new EventEmitter<Task>();
  @Output()
  taskModificationError = new EventEmitter<string>();

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl(''),
    });
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.task) {
        this.taskService.updateTask({_id: this.task._id, ...this.taskForm.value}).subscribe(
          (res) => {
            this.taskUpdated.emit(res);
          },
          (error) => {
            this.taskModificationError.emit(error);
          }
        )
      } else {
        this.taskService.createTask(this.taskForm.value).subscribe(
          (res) => {
            this.taskCreated.emit(res);
          },
          (error) => {
            this.taskModificationError.emit(error);
          }
        )
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
