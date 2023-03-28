import React from 'react';

function Navbar({ children }) {
  return (
    <section id="navbar" className="col-span-full px-8">
      <nav aria-label="main-nav" className="h-full">
        <ul className="my-auto flex h-full flex-row text-sm">{children}</ul>
      </nav>
    </section>
  );
}

export default Navbar;
