# React Propose

Props, composed.

This package exposes a tiny (465 b), 0 dependency helper function allowing you to compose props from a parent component. Promoting ease of composition - drill down layer by layer by refining each prop, with full TypeScript support.

_Note: Project is under active development_

TODO:

- [x] Decorate functional components
- [ ] Support forwarding refs
- [ ] Support intrinsic elements

```tsx
// Given a base component...
interface BaseMessageProps {
  message: string;
  title?: string;
}
const BaseMessage: React.FC<BaseMessageProps> = ({ message, title }) => (
  <div>
    {title && <h1>{title}</h1>}
    <p>{message}</p>
  </div>
);

// Old:
interface FooBarMessageProps extends Omit<BaseMessageProps, 'title'> {}
const FooBarMessage: React.FC<FooBarMessageProps> = ({ message }) => (
  <BaseMessage title="Foo" message={message} />
);

// Using react-propose:
import { propose } from 'react-propose';
const FooBarMessage = propose(BaseMessage, { title: 'Foo' });
```

## With Chakra UI

`styled-system` introduced a remarkably simple API to apply atomic styles to a component. Use `propose()` to achieve a similar DX, with full autocompletion and type safety:

```ts
import { propose } from 'react-propose';
import { Button } from '@chakra-ui/react';

const SimpleButton = propose(Button, { p: 4, bg: 'green.400' });
const DestructiveButton = propose(SimpleButton, { bg: 'red.400'});
```
