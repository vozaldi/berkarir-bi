'use client';

import clsx from "clsx";
import KatexText from "./KatexText";

type Props = React.HTMLAttributes<HTMLDivElement> & {

};

function AutodetectText({
  className,
  children,
  ...props
}: Props) {
  // Vars
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={clsx(["app-cat-question", className])} {...props}>
      {items.map((item) => {
        if ('string' === typeof item && /^\$.*\$$/.test(item)) {
          const content = item.slice(1, -1);

          return <KatexText key={item}>{content}</KatexText>;
        }

        return item;
      })}
    </div>
  );
};

export default AutodetectText;
