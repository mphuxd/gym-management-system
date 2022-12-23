import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import cx from "classnames";

const Searchbar = React.forwardRef(
  ({ placeholder, name, variant, className, ...props }, forwardedRef) => {
    let variantClassNames = null;
    let iconVariantClassNames = null;
    switch (variant) {
      case "rounded":
        variantClassNames =
          "focus:ring-0 focus:outline-none focus:ring-offset-0 border-b border-blue-400 bg-gray-100 text-slate-600 rounded-md";
        iconVariantClassNames = "text-gray-100";
        break;
      default:
        variantClassNames =
          "bg-gray-100 h-8 border-b border-black focus:outline-blue-600 focus:bg-white";
        iconVariantClassNames = "text-gray-400";
        break;
    }

    const classNames = cx(className, variantClassNames, "relative pl-6 py-1 text-sm");
    const iconClassNames = cx(iconVariantClassNames, "absolute ml-2");

    return (
      <div className='w-full flex flex-row items-center focus:ring-0 focus:outline-none'>
        <input
          {...props}
          ref={forwardedRef}
          className={classNames}
          type='text'
          name={name}
          placeholder={placeholder}
        />
        <MagnifyingGlassIcon className={iconClassNames} />
      </div>
    );
  }
);

Searchbar.displayName = "Searchbar";

export default Searchbar;
