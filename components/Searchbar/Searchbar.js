import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Searchbar = React.forwardRef(({ placeholder, name, ...props }, forwardedRef) => {
  return (
    <div className='flex flex-row items-center focus:ring-0 focus:outline-none'>
      <input
        {...props}
        ref={forwardedRef}
        className='relative pl-6 py-1 focus:ring-0 focus:outline-none focus:ring-offset-0 border-b border-blue-400 bg-gray-100 rounded-md text-sm text-slate-600'
        type='text'
        name={name}
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className='absolute text-slate-600 ml-1' />
    </div>
  );
});

Searchbar.displayName = "Searchbar";

export default Searchbar;
