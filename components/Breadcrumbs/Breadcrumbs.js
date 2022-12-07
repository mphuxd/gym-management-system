import React from "react";
import Link from "next/link";

function Breadcrumbs({ label, href }) {
  return (
    <div className='flex flex-row text-base font-medium'>
      <Link href={href} className='hover:underline text-blue-500 pr-2 '>
        {label}
      </Link>
      <span>/</span>
    </div>
  );
}

export default Breadcrumbs;
