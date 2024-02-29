import { render } from '@testing-library/react';

import TodoTable from './todo-table';

describe('TodoTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoTable />);
    expect(baseElement).toBeTruthy();
  });
});
