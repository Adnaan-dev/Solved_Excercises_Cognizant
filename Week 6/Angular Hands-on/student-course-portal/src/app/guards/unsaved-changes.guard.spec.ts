import { unsavedChangesGuard, CanComponentDeactivate } from './unsaved-changes.guard';

describe('unsavedChangesGuard', () => {
  it('should be defined', () => {
    expect(unsavedChangesGuard).toBeTruthy();
  });

  it('allows navigation when the component is safe to leave', () => {
    const component: CanComponentDeactivate = { canDeactivate: () => true };
    const result = unsavedChangesGuard(
      component,
      {} as never,
      {} as never,
      {} as never,
    );
    expect(result).toBeTrue();
  });
});
