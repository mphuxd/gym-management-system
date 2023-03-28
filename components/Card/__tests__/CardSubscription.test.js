import React from 'react';
import { render, screen } from '@testing-library/react';
import CardSubscription, {
  CARD_SUBSCRIPTION_TEST_ID,
} from '../CardSubscription';

describe('CardSimple ', () => {
  it('should contain text content', async () => {
    const planName = 'Test Plan';
    const planDescription = 'Test Plan Description';
    const price = '$1';
    const planLookUpKey = 'lookUpKey';
    const planIdValue = 'idValue';
    const className = 'test-classname';
    const features = ['Feature One', 'Feature Two', 'Feature Three'];
    const footnotes = 'Test Footnotes';
    render(
      <CardSubscription
        planName={planName}
        planDescription={planDescription}
        price={price}
        planLookUpKey={planLookUpKey}
        planIdValue={planIdValue}
        className={className}
        features={features}
        footnotes={footnotes}
      />
    );

    const card = await screen.findByTestId(CARD_SUBSCRIPTION_TEST_ID);
    expect(card).toHaveTextContent(planName);
    expect(card).toHaveTextContent(planDescription);
    expect(card).toHaveTextContent(price);
    expect(card).toHaveTextContent('Feature One');
    expect(card).toHaveTextContent('Feature Two');
    expect(card).toHaveTextContent('Feature Three');
    expect(card).toHaveTextContent(footnotes);
    expect(card).toHaveClass(className);
    expect(card).toMatchSnapshot();
  });

  it('should pass in className', async () => {
    const className = 'test-classname';
    const planName = 'Test Plan';
    const planDescription = 'Test Plan Description';
    const price = '$1';
    const planLookUpKey = 'lookUpKey';
    const planIdValue = 'idValue';
    const features = ['Feature One', 'Feature Two', 'Feature Three'];
    const footnotes = 'Test Footnotes';
    render(
      <CardSubscription
        planName={planName}
        planDescription={planDescription}
        price={price}
        planLookUpKey={planLookUpKey}
        planIdValue={planIdValue}
        className={className}
        features={features}
        footnotes={footnotes}
      />
    );

    const card = await screen.findByTestId(CARD_SUBSCRIPTION_TEST_ID);
    expect(card).toHaveClass(className);
    expect(card).toMatchSnapshot();
  });

  it('should have stripe input values', async () => {
    const planName = 'Test Plan';
    const planDescription = 'Test Plan Description';
    const price = '$1';
    const planLookUpKey = 'lookUpKey';
    const planIdValue = 'idValue';
    const className = 'test-classname';
    const features = ['Feature One', 'Feature Two', 'Feature Three'];
    const footnotes = 'Test Footnotes';
    render(
      <CardSubscription
        planName={planName}
        planDescription={planDescription}
        price={price}
        planLookUpKey={planLookUpKey}
        planIdValue={planIdValue}
        className={className}
        features={features}
        footnotes={footnotes}
      />
    );

    const card = await screen.findByTestId(CARD_SUBSCRIPTION_TEST_ID);
    expect(await screen.findByDisplayValue(planLookUpKey)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(planIdValue)).toBeInTheDocument();
    expect(card).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const planName = 'Test Plan';
    const planDescription = 'Test Plan Description';
    const price = '$1';
    const planLookUpKey = 'lookUpKey';
    const planIdValue = 'idValue';
    const className = 'test-classname';
    const features = ['Feature One', 'Feature Two', 'Feature Three'];
    const footnotes = 'Test Footnotes';
    render(
      <CardSubscription
        planName={planName}
        planDescription={planDescription}
        price={price}
        planLookUpKey={planLookUpKey}
        planIdValue={planIdValue}
        className={className}
        features={features}
        footnotes={footnotes}
      />
    );

    const card = await screen.findByTestId(CARD_SUBSCRIPTION_TEST_ID);
    expect(card).toMatchSnapshot();
  });
});
