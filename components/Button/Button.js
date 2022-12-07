import React from "react";
import cx from "classnames";

function Button({ as, type, onClick, className, label, variant, children, size }) {
  let variantClassName = null;
  let sizeClassName = null;

  switch (variant) {
    case "primary":
      variantClassName = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "secondary":
      variantClassName = "bg-[#C3122F] text-white";
      break;
    case "danger":
      variantClassName = "bg-red-100 text-red-700 hover:bg-red-200";
      break;
    default:
      variantClassName =
        "text-gray-800 hover:text-gray-900 border-[1px] hover:shadow-lg border-gray-400 hover:border-gray-600 hover:ring-1";
      break;
    //neutral
  }

  switch (size) {
    case "small":
      sizeClassName = "rounded-md text-sm py-1 px-2";
      break;

    default:
      sizeClassName = "rounded-md font-semibold px-4 py-2";
      break;
    //neutral
  }

  const classNames = cx(variantClassName, sizeClassName, className);
  return React.createElement(
    as,
    {
      type: type,
      onClick: onClick,
      className: classNames,
      value: label,
    },
    children
  );
}

export default Button;

// @@@ refactor
