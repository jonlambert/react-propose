import 'jest';
import '@testing-library/jest-dom/extend-expect'

import React from 'react';
import { render } from '@testing-library/react';
import { propose } from '.';

describe('propose', () => {
  it('forwards displayName', () => {
    const Base = (_: { message: string; title?: string }) => <></>;
    const Decorated = propose(Base, { message: 'hello, world' }, 'Decorated');
    expect(Decorated.displayName).toBe('Decorated');
  });
  it('renders correctly', () => {
    const Base: React.FC<{ message: string; title?: string }> = ({
      message,
      title,
    }) => (
      <div>
        <h1>{title}</h1>
        <div>{message}</div>
      </div>
    );

    const title = 'This is a title';
    const message = 'A message';

    const Decorated = propose(Base, { title });
    const { getByRole, getByText } = render(<Decorated message={message} />);
    expect(getByRole('heading')).toHaveTextContent(title);
    expect(getByText(message)).toBeInTheDocument();
  });

  it('supports intrinsic elements', () => {
    const Decorated = propose('h2', { 'aria-label': 'test-label' });
    const { getByLabelText } = render(<Decorated>Hello, world</Decorated>);
    expect(getByLabelText('test-label')).toHaveTextContent('Hello, world');
  })
});
