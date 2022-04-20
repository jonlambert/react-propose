import {
  createElement,
  forwardRef,
  JSXElementConstructor,
  ComponentProps,
} from 'react';

export function propose<
  ComponentType extends JSXElementConstructor<any>,
  OriginalProps extends ComponentProps<ComponentType>,
  SuppliedProps extends Partial<OriginalProps>
>(Component: ComponentType, props: SuppliedProps, displayName?: string) {
  type FinalProps = Omit<OriginalProps, keyof SuppliedProps>;

  const NewComponent = forwardRef<any, FinalProps>((ref, p) => {
    const combinedProps = { ...props, ...p, ref };
    return createElement(Component, combinedProps);
  });

  NewComponent.displayName = displayName;

  return NewComponent;
}
