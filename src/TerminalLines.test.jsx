import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import TerminalLines from './TerminalLines';

const LINES = [
  { prompt: '$', text: 'whoami' },
  { text: 'hi' },
];

// Each character is scheduled after React re-renders, so advance one character (40ms) at a time
const typeChars = (n) => {
  for (let i = 0; i < n; i++) act(() => vi.advanceTimersByTime(40));
};

describe('TerminalLines', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('types commands one character at a time and shows output at once', () => {
    vi.useFakeTimers();
    const { container } = render(<TerminalLines lines={LINES} delay={0} />);
    const command = () => container.querySelector('.Home__cmd')?.textContent;
    const output = () => container.querySelector('.Home__out')?.textContent;

    act(() => vi.advanceTimersByTime(0));
    expect(command()).toBe('');
    expect(output()).toBeUndefined();

    typeChars(3);
    expect(command()).toBe('who');
    expect(output()).toBeUndefined();

    typeChars(3);
    expect(command()).toBe('whoami');
    expect(output()).toBe('hi');
  });

  it('shows no blinking cursor on output lines once typing is done', () => {
    vi.useFakeTimers();
    const { container } = render(<TerminalLines lines={LINES} delay={0} />);
    act(() => vi.advanceTimersByTime(0));
    typeChars(6);
    expect(container.querySelector('.Home__caret')).toBeNull();
  });
});
