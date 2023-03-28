import React from 'react';
import useSWR from 'swr';
import { Notification } from '../Notification';
import fetcher from '@/lib/useSWRFetcher';

function StatusMessage({ subscriptionId, className, size }) {
  const { data: subscription } = useSWR(
    `/api/member/getStripeSubscription/${subscriptionId}`,
    fetcher
  );

  let message = null;
  let subtitle = null;
  let intent = null;

  const status = subscription?.subscription?.status; // [1]
  const reason = subscription?.subscription?.cancellation_details?.reason;

  if (status === 'incomplete') {
    intent = 'error';
    message = 'Incomplete';
    subtitle = 'Initial payment attempt failed.';
  } else if (status === 'incomplete_expired') {
    intent = 'error';
    message = 'Incomplete Expired';
    subtitle = 'Initial payment failed and invoice voided.';
  } else if (status === 'trialing') {
    intent = 'information';
    message = 'Trial';
    subtitle = 'Subscription is currently in a trial period.';
  } else if (status === 'past_due') {
    intent = 'warning';
    message = 'Past due';
    subtitle = 'Automatic payment renewal failed.';
  } else if (status === 'canceled') {
    intent = 'error';
    message = 'Cancelled';
    if (reason === 'cancellation_requested') {
      subtitle = 'Requested by member.';
    }
    if (reason === 'payment_failed') {
      subtitle = 'Repeated failed payment attempts.';
    }
  } else if (status === 'unpaid') {
    intent = 'error';
    message = 'Unpaid';
    subtitle = 'Automatic payment renewal failed and exhausted.';
  }

  const notificationProps = {
    className,
    size,
    intent,
    message,
    subtitle,
  };

  return subscription && <Notification {...notificationProps} />;
}

export default StatusMessage;

// [1] Possible values are incomplete, incomplete_expired, trialing, active, past_due, canceled, or unpaid
// https://stripe.com/docs/api/subscriptions/object#subscription_object-status
