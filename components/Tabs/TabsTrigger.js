import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "./Tabs.module.scss";
import cx from "classnames";

export const TabsTrigger = React.forwardRef((props, forwardedRef) => {
  const { className, ...rest } = { ...props };
  const classNames = cx(styles.tabsTrigger, className);
  return <Tabs.Trigger className={classNames} {...rest} ref={forwardedRef} />;
});

TabsTrigger.displayName = "TabsTrigger";
