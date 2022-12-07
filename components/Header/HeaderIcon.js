import React from "react";
import Link from "next/link";
import { Tooltip } from "/components";

function HeaderIcon({ icon, content, href }) {
  return (
    <Tooltip
      content={content}
      trigger={
        <Link className='p-2 block hover:shadow-lg shadow-red-900' href={href}>
          {icon}
        </Link>
      }
    />
  );
}

export default HeaderIcon;
