import React from 'react';
import {
  CheckmarkFilled,
  CheckmarkOutlineError,
  CheckmarkOutlineWarning,
  MisuseOutline,
  Undefined,
  Unknown,
} from '@carbon/icons-react';
import cx from 'classnames';

function Status({ status }) {
  let icon = null;
  const className = 'm-2 h-5 w-5';

  switch (status) {
    case 'ACTIVE':
      icon = <CheckmarkFilled className={cx(className, 'fill-green10')} />;
      break;
    case 'INACTIVE':
      icon = <Undefined className={cx(className, ' fill-purple10 ')} />;
      break;
    case 'LATE':
      icon = (
        <CheckmarkOutlineWarning className={cx(className, 'fill-yellow8')} />
      );
      break;
    case 'CANCELLED':
      icon = (
        <CheckmarkOutlineError className={cx(className, 'fill-green10')} />
      );
      break;
    case 'BANNED':
      icon = <MisuseOutline className={cx(className, 'fill-red10')} />;
      break;
    default:
      icon = <Unknown className={cx(className, 'fill-gray9')} />;
      break;
  }
  return icon;
}

export default Status;
