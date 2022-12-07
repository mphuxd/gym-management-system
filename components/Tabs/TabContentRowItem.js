import React from "react";
import cx from "classnames";
import * as Label from "@radix-ui/react-label";

function TabContentRowItem({ label, value, space }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  let basisValue = null;

  switch (space) {
    case "half":
      basisValue = "basis-1/2";
      break;
    case "third":
      basisValue = "basis-1/3";
      break;
    default:
      basisValue = "basis-full";
  }

  const defaultClassName = "flex flex-col";
  const classNames = cx(defaultClassName, basisValue);

  if (value === null || value === undefined) value = "-";

  return (
    <div className={classNames}>
      <Label.Root className='text-sm mb-1 font-medium text-gray-500' htmlFor={id}>
        {label}
      </Label.Root>
      <span id={id}>{value}</span>
    </div>
  );
}

export default TabContentRowItem;
