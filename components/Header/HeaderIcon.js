import React from 'react';
import Link from 'next/link';
import { Tooltip } from '@/components';

function HeaderIcon({ icon, content, href }) {
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
