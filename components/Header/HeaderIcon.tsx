import React from 'react';
import Link from 'next/link';
import { Tooltip } from '../Tooltip';

export interface HeaderIconProps {
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  content?: string;
}

function HeaderIcon({ icon, content, href }: HeaderIconProps) {
  return (
    <Tooltip
      content={content}
      trigger={
        <Link
          className="block p-2 hover:bg-layer-hover active:bg-layer-active"
          href={href}
        >
          {icon}
        </Link>
      }
    />
  );
}

export default HeaderIcon;
