import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    // component-scoped service — provide it explicitly in the test module
    TestBed.configureTestingModule({ providers: [NotificationService] });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds and clears messages', () => {
    service.add('hello');
    expect(service.getMessages().length).toBe(1);
    service.clear();
    expect(service.getMessages().length).toBe(0);
  });
});
