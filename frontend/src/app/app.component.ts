import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Task Tracker</h1>
    <form (ngSubmit)="addTask()">
      <input [(ngModel)]="newTitle" name="title" placeholder="Task title" required/>

      <!-- using select instead to add priority -->
      <select [(ngmodel)]="newPriority" name="priority" required/>
        <option value="" disabled selected>Please select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add</button>
    </form>
    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }} ({{ task.priority }}) <span *ngIf="task.completed">[Done]</span>
        <!-- checkbox/button to mark as completed -->
        <button *ngIf="!task.completed" (click)="markAsCompleted(task)">Mark as Completed</button>
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTitle = '';
  //default value of priority
  newPriority: 'low' | 'medium' | 'high' = 'low'; //setting low as the default value

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    //validate value **just in case
    if(!this.newTitle || !this.newPriority)
        return;

    this.taskService.addTask(this.newTitle, this.newPriority).subscribe(() => {
      this.newTitle = '';
      this.newPriority = 'low';
      this.loadTasks();
    });
  }

  //action to mark the task as completed.
  markAsCompleted(task: Task) {
    this.taskService.updateTaskStatus(task.id!, true).subscribe(() => {
      this.loadTasks();
    })
  }
}