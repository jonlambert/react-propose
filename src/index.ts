import React, {
  createElement,
  JSXElementConstructor,
  ComponentProps,
  forwardRef,
  ForwardedRef,
  RefCallback,
  Ref,
} from 'react';

type IntrinsicElementKeys = keyof JSX.IntrinsicElements;

export function propose<
  ComponentType extends JSXElementConstructor<any> | IntrinsicElementKeys,
  OriginalProps extends ComponentProps<ComponentType>,
  SuppliedProps extends Partial<OriginalProps>,
  RefType extends ComponentType extends IntrinsicElementKeys
    ?
        | Ref<JSX.IntrinsicElements[ComponentType]>
        | RefCallback<JSX.IntrinsicElements[ComponentType]>
    : "Unable to pass a ref to a function component"
>(Component: ComponentType, props: SuppliedProps, displayName?: string) {
  type FinalProps = Omit<OriginalProps, keyof SuppliedProps> &
    Partial<SuppliedProps>;

  if (typeof Component === 'string') {
    const NewComponent = forwardRef<RefType, FinalProps>((p, ref) => {
      const combinedProps = { ...props, ...p, ref };
      return createElement(Component, combinedProps);
    });
    NewComponent.displayName = displayName;
    return NewComponent;
  }

  const NewComponent: React.FC<FinalProps> = (p) => {
    const combinedProps = { ...props, ...p };
    return createElement(Component, combinedProps);
  };
  NewComponent.displayName = displayName;

  return NewComponent;
}
