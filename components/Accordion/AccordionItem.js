import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import styles from './Accordion.module.scss';

const AccordionItem = React.forwardRef(
  ({ children, header, ...props }, forwardedRef) => {
    const classNames = cx(
      'flex flex-row justify-between items-center w-full',
      styles.AccordionTrigger
    );
    return (
      <AccordionPrimitive.Item ref={forwardedRef} {...props}>
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger className={classNames}>
            <h3>{header}</h3>
            <ChevronDown className={styles.AccordionChevron} />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content>{children}</AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
