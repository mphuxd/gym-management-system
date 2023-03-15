import React from 'react';
import cx from 'classnames';
import { cva } from 'class-variance-authority';
import {
  CheckmarkFilled,
  ErrorFilled,
  InformationFilled,
  WarningFilled,
} from '@carbon/icons-react';

const iconStyles = cva('inline', {
  variants: {
    intent: {
      checkmark: 'fill-green10',
      information: 'fill-blue10',
      warning: 'fill-yellow8',
      error: 'fill-red10',
    },
  },
  defaultVariants: {
    intent: 'warning',
  },
});

function NotificationIcon({ className, intent }) {
  const classNames = cx(iconStyles({ intent }), className);
  let icon = null;
  switch (intent) {
    case 'checkmark':
      icon = <CheckmarkFilled className={classNames} />;
      break;
    case 'error':
      icon = <ErrorFilled className={classNames} />;
      break;
    case 'information':
      icon = <InformationFilled className={classNames} />;
      break;
    case 'warning':
      icon = <WarningFilled className={classNames} />;
      break;
    default:
      break;
  }
  return icon && <div>{icon}</div>;
}

export default NotificationIcon;
