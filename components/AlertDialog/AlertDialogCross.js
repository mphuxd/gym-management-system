import React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

function AlertDialogCross(props) {
  return (
    <button
      {...props}
      type="button"
      className="bg-transparent p-2 hover:bg-neg-hover hover:text-white active:bg-neg-active active:outline-none"
    >
      <Cross2Icon className="fill-icon" />
    </button>
  );
}

export default AlertDialogCross;
