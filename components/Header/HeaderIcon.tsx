import React from 'react';
import Link from 'next/link';
import { Tooltip } from '../Tooltip';

export interface HeaderIconProps
  extends React.ComponentPropsWithoutRef<typeof Tooltip> {
  children: React.ReactNode;
  href?: string;
  content?: string;
}

function HeaderIcon({ children, content, href }: HeaderIconProps) {
  return (
    <Tooltip content={content}>
      <Link
        className="block p-2 hover:bg-layer-hover active:bg-layer-active"
        href={href}
      >
        {children}
      </Link>
    </Tooltip>
  );
}

export default HeaderIcon;
