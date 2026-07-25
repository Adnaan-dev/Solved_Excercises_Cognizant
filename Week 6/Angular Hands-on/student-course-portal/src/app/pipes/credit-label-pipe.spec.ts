import { CreditLabelPipe } from './credit-label-pipe';

describe('CreditLabelPipe', () => {
  const pipe = new CreditLabelPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns "No Credits" for null, undefined or 0', () => {
    expect(pipe.transform(null)).toBe('No Credits');
    expect(pipe.transform(undefined)).toBe('No Credits');
    expect(pipe.transform(0)).toBe('No Credits');
  });

  it('returns singular for 1 and plural for 2+', () => {
    expect(pipe.transform(1)).toBe('1 Credit');
    expect(pipe.transform(3)).toBe('3 Credits');
  });
});
