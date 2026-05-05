import React, { forwardRef, memo, useContext } from 'react';
import { SWMIconContext } from './context';
import { IconType } from '../types';

const createIcon = (Component: React.FC<IconType>) => {
  const IconWrapper = forwardRef<SVGSVGElement, IconType>(({ color, strokeWidth, size, set, ...props }, ref) => {
    const context = useContext(SWMIconContext);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || context.size}
        height={size || context.size}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
        ref={ref}
      >
        <Component color={color || context.color} strokeWidth={strokeWidth || context.strokeWidth} set={set || context.set} />
      </svg>
    );
  });

  const MemoIcon = memo(IconWrapper);
  return MemoIcon;
};

export default createIcon;
