import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

/*
 * Hands-On 8: reads the course count over HTTP and can POST a new course.
 * After a successful create it refreshes the count from the API.
 */
@Component({
  selector: 'app-course-summary-widget',
  imports: [CommonModule],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css',
})
export class CourseSummaryWidgetComponent implements OnInit {
  private courseService = inject(CourseService);
  count = 0;

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => (this.count = courses.length),
      error: () => (this.count = 0),
    });
  }

  addSampleCourse(): void {
    const course: Omit<Course, 'id'> = {
      name: 'New Elective',
      code: 'EL' + Math.floor(Math.random() * 900 + 100),
      credits: 2,
      gradeStatus: 'pending',
    };
    this.courseService.createCourse(course).subscribe({
      next: () => this.refresh(),
      error: (err) => console.error(err),
    });
  }
}
