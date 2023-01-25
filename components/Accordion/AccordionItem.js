import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import styles from './Accordion.module.scss';

export const ACCORDION_ITEM_TEST_ID = 'accordion-item';
export const ACCORDION_TRIGGER_TEST_ID = 'accordion-trigger';
export const ACCORDION_HEADER_TEST_ID = 'accordion-header';
export const ACCORDION_CONTENT_TEST_ID = 'accordion-content-text';

const AccordionItem = React.forwardRef(
  ({ children, header, value, ...props }, forwardedRef) => {
    const classNames = cx(
      'flex flex-row justify-between items-center w-full',
      styles.AccordionTrigger
    );
    return (
      <AccordionPrimitive.Item
        ref={forwardedRef}
        value={value}
        {...props}
        data-testid={ACCORDION_ITEM_TEST_ID}
      >
        <AccordionPrimitive.Header data-testid={ACCORDION_HEADER_TEST_ID}>
          <AccordionPrimitive.Trigger
            className={classNames}
            data-testid={ACCORDION_TRIGGER_TEST_ID}
          >
            <h3>{header}</h3>
            <ChevronDown className={styles.AccordionChevron} />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content data-testid={ACCORDION_CONTENT_TEST_ID}>
          {children}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
