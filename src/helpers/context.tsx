import React, { createContext } from 'react';
import { IconType } from '../types';

const defaultValues: IconType = {
  color: '#001A72',
  strokeWidth: '1.5',
  size: '24',
  set: 'outline',
};

export const SWMIconContext = createContext(defaultValues);
SWMIconContext.displayName = 'SWMIconContext';

export const SWMIconProvider: React.FC<IconType & {children: React.ReactNode}> = ({ children, color, strokeWidth, size, set }) => {
  const providerValues: IconType = {
    color: color || defaultValues.color,
    strokeWidth: strokeWidth || defaultValues.strokeWidth,
    size: size || defaultValues.size,
    set: set || defaultValues.set,
  };

  return <SWMIconContext.Provider value={providerValues}>{children}</SWMIconContext.Provider>;
};
