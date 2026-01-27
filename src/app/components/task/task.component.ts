import {Component, EventEmitter, Input, Output} from '@angular/core';
import Task from '../../models/Task';
import {Toast} from 'primeng/toast';
import {DatePipe} from '@angular/common';
import {TaskService} from '../../services/task/task.service';
import {CreateUpdateTaskComponent} from '../create-update-task/create-update-task.component';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-task',
  imports: [
    Toast,
    DatePipe,
    CreateUpdateTaskComponent,
    Dialog
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input()
  task!: Task;

  @Output()
  deleteTaskEvent = new EventEmitter<string>();

  @Output()
  updateTaskEvent = new EventEmitter<Task>();

  @Output()
  taskUpdateError = new EventEmitter<string>();

  isModalVisible: boolean = false;

  constructor(private taskService: TaskService) {}

  deleteTask() {
    this.taskService.deleteTask(this.task._id).subscribe(
      (res) => {
        this.deleteTaskEvent.emit(this.task._id);
      },
      (error) => {
        console.error(error);
        this.deleteTaskEvent.emit("error");
      }
    );
  }

  showModal() {
    this.isModalVisible = true;
  }
  hideModal() {
    this.isModalVisible = false;
  }

  updateTask(task: any) {
    this.hideModal();
    this.updateTaskEvent.emit(task);
  }
  taskUpdateErrorEvent(error: string) {
    this.taskUpdateError.emit(error);
  }

}
