import React from 'react';
import cx from 'classnames';

function TableRow({ onClick, render, row, cursor = 'pointer' }) {
  const classNames = cx(
    'relative hover:cursor-pointer border-y-[1px] border-gray6 hover:bg-gray4 focus:bg-gray4 active:bg-gray-5 overflow-hidden h-fit',
    {
      'hover:cursor-auto': cursor === 'auto',
      'hover:cursor-pointer': cursor === 'pointer',
      'hover:cursor-text': cursor === 'text',
    }
  );

  return (
    <tr tabIndex={0} onClick={(e) => onClick(e, row)} className={classNames}>
      {render(row)}
    </tr>
  );
}

export default TableRow;
