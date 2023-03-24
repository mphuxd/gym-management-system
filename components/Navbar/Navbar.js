import React from 'react';

function Navbar({ children }) {
  return (
    <section id="navbar" className="col-span-full px-8">
      <nav>
        <ul className="flex flex-row text-sm">{children}</ul>
      </nav>
    </section>
  );
}

export default Navbar;
