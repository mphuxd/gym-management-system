import React from "react";
import cx from "classnames";

function Grid({ as = "div", children, columns = 12, className }) {
  const classNames = cx("grid", `grid-cols-${columns}`, className);
  return React.createElement(as, { className: classNames }, children);
}

export default Grid;
