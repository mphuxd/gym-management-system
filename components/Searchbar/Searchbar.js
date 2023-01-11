import React from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { cva } from 'class-variance-authority';
import cx from 'classnames';

const searchBarStyles = cva(['relative pl-6 text-sm'], {
  variants: {
    intent: {
      primary:
        'bg-white h-8 border-b border-blue9 focus:outline-blue10 hover:outline-blue11 focus:bg-white',
      tertiary:
        'text-slate11 outline-blue9 outline outline-[1px] hover:text-white hover:shadow-sm hover:bg-blue11 active:bg-blue11',
      neutral:
        'focus:ring-0 focus:outline-none focus:ring-offset-0 border-b border-blue-400 bg-gray-100 text-slate-600',
    },
    size: {
      small: 'w-60 py-1 px-2',
      base: 'w-80 py-2  ',
      large: 'w-96 py-5',
    },
    rounded: {
      true: 'rounded-md',
      false: '',
    },
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'base',
    rounded: 'false',
  },
});

const Searchbar = React.forwardRef(
  (
    { placeholder, name, className, intent, size, rounded, ...props },
    forwardedRef
  ) => {
    const classNames = cx(
      className,
      searchBarStyles({ intent, size, rounded })
    );
    const iconClassNames = cx('absolute ml-2');

    return (
      <div className="w-full flex flex-row items-center focus:ring-0 focus:outline-none">
        <input
          {...props}
          ref={forwardedRef}
          className={classNames}
          type="text"
          name={name}
          placeholder={placeholder}
        />
        <MagnifyingGlassIcon className={iconClassNames} />
      </div>
    );
  }
);

Searchbar.displayName = 'Searchbar';

export default Searchbar;
