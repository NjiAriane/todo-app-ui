import {Component, OnInit} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {Menubar} from 'primeng/menubar';
import {MenuItem, MenuItemCommandEvent, MessageService} from 'primeng/api';
import {Tag} from 'primeng/tag';
import {TaskComponent} from '../../components/task/task.component';
import {Dialog} from 'primeng/dialog';
import {CreateUpdateTaskComponent} from '../../components/create-update-task/create-update-task.component';
import {Toast} from 'primeng/toast';
import {TaskService} from '../../services/task/task.service';
import Task from '../../models/Task';

@Component({
  selector: 'app-dashboard',
  imports: [
    NavbarComponent,
    Menubar,
    TaskComponent,
    Dialog,
    CreateUpdateTaskComponent,
    Toast,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService, private messageService: MessageService) {
  }
  items: MenuItem[] | undefined;
  isModalVisible: boolean = false;
  activeIndex: number = 0;
  ngOnInit() {
    this.items = [
      {
        label: "all",
        command: () => {
          this.activeIndex = 0;
          this.getUserTasks();
        }
      },
      {
        label: "Pending",
        command: () => {this.activeIndex = 1; this.getPendingTasks()}
      },
      {
        label: "In Progress",
        command: () => {this.activeIndex = 2; this.getInProgressTasks()}
      },
      {
        label: "Completed",
        command: () => {this.activeIndex = 3; this.getCompletedTasks()}
      }
    ];
    this.getUserTasks();
  }

  showModalDialog() {
    this.isModalVisible = true;
  }

  hideModalDialog() {
    this.isModalVisible = false;
  }
  taskCreated(task: Task) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task successfully created' });
    this.tasks.push(task);
    this.hideModalDialog();
  }
  taskUpdated(task: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task successfully updated' });
    this.tasks = this.tasks.map(t => {
      if (t._id === task._id) {
        return task;
      }
      return t;
    });
  }
  taskModificationError(error: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }

  taskDelete(event: any) {
    if (event !== "error") {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task successfully deleted' });
      this.tasks = this.tasks.filter(t => t._id !== event);
    }
  }

  getUserTasks() {
    this.taskService.getTasks().subscribe(
      (res) => {
        this.tasks = res;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      }
    );
  }

  getPendingTasks() {
    this.getUserTasks();
    this.pendingTasks = this.tasks.filter(task => task.status === 'pending');
  }

  getCompletedTasks() {
    this.getUserTasks();
    this.completedTasks = this.tasks.filter(task => task.status === 'completed');
  }
  getInProgressTasks() {
    this.inProgressTasks = this.tasks.filter(task => task.status === 'in progress');
  }

}
