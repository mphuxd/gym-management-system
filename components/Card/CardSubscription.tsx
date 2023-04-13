import React from 'react';
import cx from 'classnames';
import * as Separator from '@radix-ui/react-separator';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components';

export const CARD_SUBSCRIPTION_TEST_ID = 'cardSubscriptionTestId';

export interface CardSubscriptionProps {
  planName: string;
  price: string;
  planLookUpKey: string;
  planIdValue: string;
  className?: string;
  features: string[];
  footnotes: string;
}

function CardSubscription({
  planName,
  price,
  planLookUpKey,
  planIdValue,
  className,
  features,
  footnotes,
}: CardSubscriptionProps) {
  return (
    <div
      className={cx(
        className,
        'w-82 flex h-[32rem] flex-col items-center justify-between bg-layer  hover:bg-layer-hover'
      )}
      data-testid={CARD_SUBSCRIPTION_TEST_ID}
    >
      <div className="flex h-full w-full flex-col justify-between p-8">
        <div className="flex flex-col justify-center">
          <h2 className="w-fit text-2xl font-semibold">{planName}</h2>
          <h3 className="mt-6 text-2xl">{price}</h3>
          <Separator.Root className="my-6 h-px bg-border-subtle-darker" />
          <div className="mb-3 flex flex-col gap-y-2">
            {features &&
              features.map((feature) => (
                <div
                  key={feature}
                  className="flex flex-row items-center text-sm"
                >
                  <CheckCircledIcon
                    width={16}
                    height={16}
                    className="mr-1 text-brand"
                  />
                  <span className="inline-block">{`${feature}`}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col">
          <form className="mt-4" action="/api/checkout_sessions" method="POST">
            {/* Stripe - Add a hidden field with the lookup_key of your Price */}
            <input type="hidden" name="lookup_key" value={planLookUpKey} />
            <input type="hidden" name="planId" value={planIdValue} />
            <Button
              type="submit"
              id="checkout-and-portal-button"
              intent="tertiary"
              size="large"
              length="medium"
            >
              Subscribe
            </Button>
          </form>
          <span className="mt-4 text-sm">{footnotes}</span>
        </div>
      </div>
    </div>
  );
}

export default CardSubscription;
