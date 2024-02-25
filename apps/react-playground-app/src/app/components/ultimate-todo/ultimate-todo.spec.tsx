import { render } from '@testing-library/react';

import UltimateTodo from './ultimate-todo';

describe('UltimateTodo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UltimateTodo />);
    expect(baseElement).toBeTruthy();
  });
});
