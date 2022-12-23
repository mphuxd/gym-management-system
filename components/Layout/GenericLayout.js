import React from "react";
import styles from "./Layout.module.scss";

function GenericLayout({ children }) {
  return <main className={styles.main}>{children}</main>;
}

export default GenericLayout;
