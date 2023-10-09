'use client';

import { FC, ReactNode } from "react";

type TextProps = {
  children?: string | ReactNode;
  className?: string
  as?: string | React.ElementType
  [x: string | number | symbol]: unknown
}

const Text: FC<TextProps> = ({
  children,
  className,
  as = 'span',
  ...props
}) => {
  const Component = as;
  return <Component className={`${className}`} {...props}>
    {children}
  </Component>
}

export default Text;