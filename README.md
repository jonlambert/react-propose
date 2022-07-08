# React Propose

Props, composed.

This package exposes a tiny [(<1kb)](https://bundlephobia.com/package/react-propose), zero dependency helper function allowing you to compose props from a parent component. Promoting ease of composition - drill down layer by layer by refining each prop, with full TypeScript support.

```tsx
import { withDefaultProps } from 'react-propose';
```

#### Given a base component:

```tsx
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
```


#### Before

```tsx
interface FooBarMessageProps extends Omit<BaseMessageProps, 'title'> {}
const FooBarMessage: React.FC<FooBarMessageProps> = ({ message }) => (
  <BaseMessage title="Foo" message={message} />
);
```

#### With `react-propose`

```tsx
const FooBarMessage = withDefaultProps(BaseMessage, { title: 'Foo' });
```

## With Chakra UI

`styled-components` introduced a simple API to apply styles to a component. Use `withDefaultProps()` to achieve a similar DX, with full autocompletion and type safety:

```ts
import { withDefaultProps } from 'react-propose';
import { Button } from '@chakra-ui/react';

const SimpleButton = withDefaultProps(Button, { p: 4, bg: 'green.400' });
const DestructiveButton = withDefaultProps(SimpleButton, { bg: 'red.400'});
```
