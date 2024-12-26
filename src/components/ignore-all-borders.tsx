import { ReactNode, isValidElement, cloneElement, Children } from 'react';

export default function ({ children }: { children: ReactNode }) {
  function addExtraProps(child: ReactNode) {
    if (isValidElement(child)) {
      return cloneElement(child, {
        // @ts-ignore
        'data-ignore-all-borders': ''
      });
    }
    return child;
  }

  return <>{Children.map(children, addExtraProps)}</>;
}
