import React from "react";

function Navbar({ children }) {
  return (
    <section id='navbar' className='col-span-full border-b border-gray-200 px-8'>
      <nav className='py-2'>
        <ul className='flex flex-row gap-x-4 text-sm'>{children}</ul>
      </nav>
    </section>
  );
}

export default Navbar;
