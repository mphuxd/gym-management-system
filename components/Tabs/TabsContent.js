import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "./Tabs.module.scss";

export const TabsContent = React.forwardRef((props, forwardedRef) => {
  return <Tabs.Content className={styles.tabsContent} {...props} ref={forwardedRef} />;
});

TabsContent.displayName = "TabsContent";
