import 'jest';
import '@testing-library/jest-dom/extend-expect';

import React, { createRef, useRef } from 'react';
import { act, render } from '@testing-library/react';
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
  });

  it('can override pre-defined props', () => {
    const Base: React.FC<{ message: string; title?: string }> = ({
      message,
      title,
    }) => (
      <div>
        <h1>{title}</h1>
        <div>{message}</div>
      </div>
    );

    const Decorated = propose(Base, { title: 'Hello', message: 'World' });
    const { getByRole } = render(<Decorated title="Foo" message="Bar" />);
    expect(getByRole('heading')).toHaveTextContent('Foo');
  });

  it('respects inherited props', () => {
    interface SharedLinkProps {
      variant: 'primary' | 'secondary';
    }
    interface LinkButtonProps
      extends SharedLinkProps,
        Pick<
          React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
          >,
          'onClick'
        > {}

    const Base: React.FC<LinkButtonProps> = () => <div></div>;

    const Derived = propose(Base, { variant: 'primary' });
    render(<Derived onClick={() => {}} variant="primary" />);
  });

  it('accepts and passes down ref', () => {
    const Decorated = propose('button', {});
    const ref = createRef<HTMLButtonElement>();
    render(<Decorated ref={ref as any}>Hello, world</Decorated>);
    expect(ref.current?.innerHTML).toEqual('Hello, world');
  });
});
