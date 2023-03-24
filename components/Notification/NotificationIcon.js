import React from 'react';
import cx from 'classnames';
import { cva } from 'class-variance-authority';
import {
  CheckmarkFilled,
  ErrorFilled,
  InformationFilled,
  WarningFilled,
} from '@carbon/icons-react';

const iconStyles = cva('mt-1', {
  variants: {
    intent: {
      checkmark: 'fill-icon-pos',
      information: 'fill-icon-info',
      warning: 'fill-icon-warn',
      error: 'fill-icon-neg',
    },
  },
  defaultVariants: {
    intent: 'warning',
  },
});

function NotificationIcon({ className, intent }) {
  const classNames = cx(iconStyles({ intent }), className);
  const iconMap = {
    checkmark: <CheckmarkFilled className={classNames} />,
    error: <ErrorFilled className={classNames} />,
    information: <InformationFilled className={classNames} />,
    warning: <WarningFilled className={classNames} />,
  };

  const icon = iconMap[intent] || null;
  return icon && <div>{icon}</div>;
}

export default NotificationIcon;
