import React from 'react';
import cx from 'classnames';
import useSWR from 'swr';
import { cva } from 'class-variance-authority';
import {
  InformationFilled,
  WarningFilled,
  ErrorFilled,
} from '@carbon/icons-react';
import fetcher from '@/lib/useSWRFetcher';

const notificationStyles = cva(
  [
    'flex flex-row gap-x-1 outline outline-1 px-2 py-1 w-fit border-l-2 border-solid',
  ],
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

function StatusMessage({ subscriptionId, className, size }) {
  const { data: subscription } = useSWR(
    `/api/member/getStripeSubscription/${subscriptionId}`,
    fetcher
  );

  let message = null;
  let subtitle = null;
  let icon = null;
  let color = null;
  let intent = null;
  const iconClassNames = 'mt-1';

  // Possible values are incomplete, incomplete_expired, trialing, active, past_due, canceled, or unpaid
  // https://stripe.com/docs/api/subscriptions/object#subscription_object-status
  switch (subscription?.subscription.status) {
    case 'incomplete':
      intent = 'error';
      message = 'Incomplete';
      subtitle = 'Initial payment attempt failed.';
      color = 'red10';
      icon = (
        <ErrorFilled className={cx(iconClassNames, `inline fill-${color}`)} />
      );
      break;
    case 'incomplete_expired':
      intent = 'error';
      message = 'Incomplete Expired';
      subtitle = 'Initial payment failed and invoice voided.';
      color = 'red10';
      icon = (
        <ErrorFilled className={cx(iconClassNames, `inline fill-${color}`)} />
      );
      break;
    case 'trialing':
      intent = 'information';
      message = 'Trial';
      subtitle = 'Subscription is currently in a trial period.';
      color = 'blue10';
      icon = (
        <InformationFilled
          className={cx(iconClassNames, `inline fill-${color}`)}
        />
      );
      break;
    case 'active':
      // do not display a StatusMessage for active
      // it is redundant
      break;
    case 'past_due':
      intent = 'warning';
      message = 'Past due';
      subtitle = 'Automatic payment renewal failed.';
      color = 'yellow8';
      icon = (
        <WarningFilled className={cx(iconClassNames, `inline fill-${color}`)} />
      );
      break;
    case 'canceled':
      intent = 'error';
      message = 'Cancelled';
      if (
        subscription.subscription.cancellation_details.reason ===
        'cancellation_requested'
      )
        subtitle = 'Requested by member.';
      if (
        subscription.subscription.cancellation_details.reason ===
        'payment_failed'
      )
        subtitle = 'Repeated failed payment attempts.';
      color = 'red10';
      icon = (
        <ErrorFilled className={cx(iconClassNames, `inline fill-${color}`)} />
      );
      break;
    case 'unpaid':
      intent = 'error';
      message = 'Unpaid';
      subtitle = 'Automatic payment renewal failed and exhausted.';
      color = 'red10';
      icon = (
        <ErrorFilled className={cx(iconClassNames, `inline fill-${color}`)} />
      );
      break;
    default:
      break;
  }

  const classNames = cx(notificationStyles({ intent }), className);

  return (
    subscription &&
    message && (
      <div className={classNames}>
        {icon}
        <div className={size === 'sm' ? 'flex flex-col' : 'flex flex-row'}>
          <span className="font-semibold pr-1">{message}</span>
          <span className="font-regular">{subtitle}</span>
        </div>
      </div>
    )
  );
}

export default StatusMessage;
