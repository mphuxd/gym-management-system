import React from 'react';
import cx from 'classnames';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { cva } from 'class-variance-authority';

const searchBarStyles = cva('relative pl-6 text-sm', {
  variants: {
    intent: {
      primary:
        'border-b border-primary bg-white hover:bg-layer-hover focus:bg-white',
      secondary: 'bg-layer-alt hover:bg-layer-hover',
      tertiary:
        'bg-white outline outline-1 -outline-offset-1 outline-primary hover:bg-layer-hover',
      neutral:
        'border-b border-slate11 bg-white hover:bg-layer-hover focus:bg-white',
      dark: 'bg-secondary text-white outline outline-1 -outline-offset-1 outline-white hover:bg-slate3Dark',
    },
    width: {
      small: 'w-60',
      base: 'w-80',
      large: 'w-96',
    },
    height: {
      small: 'h-8',
      base: 'h-9',
      large: 'h-10',
    },
    size: {
      small: 'py-1 px-2',
      base: 'py-2',
      large: 'py-5',
    },
  },
  defaultVariants: {
    intent: 'neutral',
    size: 'base',
    height: 'base',
    width: 'base',
  },
});

const Searchbar = React.forwardRef(
  (
    { placeholder, name, className, intent, width, height, size, ...props },
    forwardedRef
  ) => {
    const classNames = cx(
      className,
      searchBarStyles({ intent, width, height, size })
    );

    return (
      <div className="flex w-full flex-row items-center">
        <input
          {...props}
          ref={forwardedRef}
          className={classNames}
          type="text"
          name={name}
          placeholder={placeholder}
        />
        <MagnifyingGlassIcon className="absolute ml-2" />
      </div>
    );
  }
);

Searchbar.displayName = 'Searchbar';

export default Searchbar;
