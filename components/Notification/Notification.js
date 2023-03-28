import React from 'react';
import cx from 'classnames';
import { cva } from 'class-variance-authority';
import NotificationIcon from './NotificationIcon';

const notificationStyles = cva(
  'flex flex-row gap-x-1 outline outline-1 px-2 py-1 w-fit border-l-2 border-solid',
  {
    variants: {
      intent: {
        checkmark: 'bg-green3 outline-green7 border-green10',
        information: 'bg-blue3 outline-blue7 border-blue10',
        warning: 'bg-yellow3 outline-yellow7 border-yellow8',
        error: 'bg-red3 outline-red7 border-red10',
      },
    },
    defaultVariants: {
      intent: 'warning',
    },
  }
);

function Notification({ className, size, message, subtitle, intent }) {
  const classNames = cx(notificationStyles({ intent }), className);
  return (
    message &&
    subtitle && (
      <div className={classNames}>
        <NotificationIcon intent={intent} />
        <div className={size === 'sm' ? 'flex flex-col' : 'flex flex-row'}>
          <span className="font-semibold pr-1">{message}</span>
          <span className="font-regular">{subtitle}</span>
        </div>
      </div>
    )
  );
}

export default Notification;
