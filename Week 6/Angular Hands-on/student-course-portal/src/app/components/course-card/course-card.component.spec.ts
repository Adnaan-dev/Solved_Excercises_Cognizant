import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';

// Hands-On 10, Task 1: component tests for CourseCardComponent.
describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [provideMockStore({ initialState: { enrollment: { enrolledCourseIds: [] } } })],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the course name (@Input)', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLElement;
    expect(h3.textContent).toContain('Data Structures');
  });

  it('emits enrollRequested with the course id on click (@Output)', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    spyOn(component.enrollRequested, 'emit');
    const button = fixture.debugElement.query(By.css('.enroll-btn')).nativeElement as HTMLElement;
    button.click();
    fixture.detectChanges();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('logs previous/current on ngOnChanges', () => {
    const logSpy = spyOn(console, 'log');
    component.ngOnChanges({
      course: {
        previousValue: undefined,
        currentValue: mockCourse,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(logSpy).toHaveBeenCalled();
  });

  it('reflects the enrolled state from the store (default not enrolled)', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    expect(component.enrolled).toBeFalse();
  });
});
