import { ReactNode, isValidElement, cloneElement, Children } from 'react';

export default function ({ children }: { children: ReactNode }) {
  function addExtraProps(child: ReactNode) {
    if (isValidElement(child)) {
      return cloneElement(child, {
        // @ts-ignore
        'data-ignore-border': ''
      });
    }
    return child;
  }

  return <>{Children.map(children, addExtraProps)}</>;
}
