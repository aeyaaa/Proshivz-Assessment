import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Task Tracker</h1>
    <form (ngSubmit)="addTask()">
      <input [(ngModel)]="newTitle" name="title" placeholder="Task title" />
      <!-- BUG: missing priority input -->
      <button type="submit">Add</button>
    </form>
    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }} ({{ task.priority }}) <span *ngIf="task.completed">[Done]</span>
        <!-- MISSING: checkbox/button to mark as completed -->
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    // BUG: should also provide priority
    this.taskService.addTask(this.newTitle).subscribe(() => {
      this.newTitle = '';
      this.loadTasks();
    });
  }
}