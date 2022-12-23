import React from "react";
import cx from "classnames";
import styles from "./Grid.module.scss";

function Grid({ as = "div", children, columns = 12, className }) {
  const classNames = cx(styles.grid, className, `grid-cols-${columns}`);
  return React.createElement(as, { className: classNames }, children);
}

export default Grid;
