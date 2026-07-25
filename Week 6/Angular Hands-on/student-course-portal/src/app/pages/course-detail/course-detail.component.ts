import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  course: Course | undefined;

  ngOnInit(): void {
    // Hands-On 7, Task 1, step 69: read the :id route parameter
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Hands-On 8: load the course over HTTP
    this.courseService.getCourseById(id).subscribe({
      next: (course) => (this.course = course),
      error: (err) => console.error(err),
    });
  }
}
