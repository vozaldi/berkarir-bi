'use client';

import clsx from "clsx";
import KatexText from "./KatexText";
import { KatexOptions } from "katex";
import parse, { domToReact } from 'html-react-parser';
import { Fragment } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  katexOptions?: Partial<KatexOptions>;
};

function AutodetectText({
  className,
  katexOptions,
  children,
  ...props
}: Props) {
  // Vars
  const replaceLatexInline = (text: string) => {
    const regex = /\$([\s\S]*?)\$/g; // match LaTeX spans
    const parts = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index);

      if (before) {
        // Split by \n and interleave <br />
        const split = before.split(/\n/);
        split.forEach((segment, i) => {
          if (i > 0) parts.push(<br key={`br-${match?.index}-${i}`} />);
          if (segment) parts.push(segment);
        });
      }

      // Push LaTeX block as-is
      parts.push(
        <KatexText
          key={`latex-${match.index}`}
          katexOptions={katexOptions}
        >{`${match[1]}`}</KatexText>
      );
      lastIndex = regex.lastIndex;
    }

    const remaining = text.slice(lastIndex);

    if (remaining) {
      const split = remaining.split(/\n/);

      split.forEach((segment, i) => {
        if (i > 0) parts.push(<br key={`br-tail-${i}`} />);
        if (segment) parts.push(segment);
      });
    }

    return parts;
  };

  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={clsx(["app-autodetect-text", className])} {...props}>
      {items.map((item) => {
        return parse(item, {
          replace: (node) => {
            if (node.type === 'text' && node.data.includes('$')) {
              return <>{replaceLatexInline(node.data)}</>;
            }

            if (node.type === 'text' && node.data.includes("\n")) {
              const normalized = node.data.replace(/\r\n|\r/g, '\n');
              const parts = normalized.split('\n');

              // Insert <br /> between lines
              return (
                <>
                  {parts.map((part, i) => (
                    <Fragment key={i}>
                      {part}
                      {i !== parts.length - 1 && <br />}
                    </Fragment>
                  ))}
                </>
              );
            }
          }
        });
      })}
    </div>
  );
};

export default AutodetectText;
