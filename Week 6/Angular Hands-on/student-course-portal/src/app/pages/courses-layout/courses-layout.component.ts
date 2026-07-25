import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Hands-On 7, Task 1, step 72: layout host for the nested /courses routes.
@Component({
  selector: 'app-courses-layout',
  imports: [RouterOutlet],
  templateUrl: './courses-layout.component.html',
  styleUrl: './courses-layout.component.css',
})
export class CoursesLayoutComponent {}
