import React, {
  createElement,
  JSXElementConstructor,
  ComponentProps,
} from 'react';

type IntrinsicElementKeys = keyof JSX.IntrinsicElements;

export function propose<
  ComponentType extends JSXElementConstructor<any> | IntrinsicElementKeys,
  OriginalProps extends ComponentProps<ComponentType>,
  SuppliedProps extends Partial<OriginalProps>
>(Component: ComponentType, props: SuppliedProps, displayName?: string) {
  type FinalProps = Omit<OriginalProps, keyof SuppliedProps> &
    Partial<SuppliedProps>;

  const NewComponent: React.FC<FinalProps> = (p) => {
    const combinedProps = { ...props, ...p };
    return createElement(Component, combinedProps);
  };
  NewComponent.displayName = displayName;

  return NewComponent;
}
