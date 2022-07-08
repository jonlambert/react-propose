import React, {
  createElement,
  JSXElementConstructor,
  ComponentProps,
  forwardRef,
  RefCallback,
  Ref,
} from 'react';

type IntrinsicElementKeys = keyof JSX.IntrinsicElements;

/**
 * Takes a supplied component or intrinsic HTML element key, and return a new component with the supplied default props set.
 * 
 * @param Component Either a React component, or any intrinsic element key (div, h1)
 * @param props The props to fill-in
 * @param displayName Optionally pass this for use in React
 * @returns A new component, props pre-filled with those supplied in the second argument
 */
export function propose<
  ComponentType extends JSXElementConstructor<any> | IntrinsicElementKeys,
  OriginalProps extends ComponentProps<ComponentType>,
  SuppliedProps extends Partial<OriginalProps> | (() => Partial<OriginalProps>),
  RefType extends ComponentType extends IntrinsicElementKeys
    ?
        | Ref<JSX.IntrinsicElements[ComponentType]>
        | RefCallback<JSX.IntrinsicElements[ComponentType]>
    : "Unable to pass a ref to a function component (yet!)"
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

/**
 * Takes a supplied component or intrinsic HTML element key, and return a new component with the supplied default props set.
 * 
 * @param Component Either a React component, or any intrinsic element key (div, h1)
 * @param props The props to fill-in
 * @param displayName Optionally pass this for use in React
 * @returns A new component, props pre-filled with those supplied in the second argument
 */
export const withDefaultProps = propose;
