import React from "react";
import Link from "next/link";
import { Tooltip } from "@/components";

function HeaderIcon({ icon, content, href }) {
  return (
    <Tooltip
      content={content}
      trigger={
        <Link
          className='p-2 block hover:bg-slate4 rounded-sm focus:outline focus:outline-slate7 active:bg-slate5'
          href={href}
        >
          {icon}
        </Link>
      }
    />
  );
}

export default HeaderIcon;
