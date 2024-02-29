import { render } from '@testing-library/react';

import AddTodo from './add-todo';

describe('AddTodo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddTodo />);
    expect(baseElement).toBeTruthy();
  });
});
