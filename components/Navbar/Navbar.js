function Navbar({ children }) {
  return (
    <section id='navbar' className='col-span-full px-8'>
      <nav className=''>
        <ul className='flex flex-row text-sm font-semibold'>{children}</ul>
      </nav>
    </section>
  );
}

export default Navbar;
