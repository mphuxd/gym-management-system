import React from "react";
import cx from "classnames";

function Stack({ as = "div", children, direction = "col", className }) {
  const classNames = cx(className, {
    ["flex flex-col"]: direction === "col",
    ["flex flex-row"]: direction === "row",
  });
  return React.createElement(as, { className: classNames }, children);
}

export default Stack;
