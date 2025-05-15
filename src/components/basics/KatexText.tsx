'use client';

import clsx from "clsx";
import katex, { KatexOptions } from "katex";
import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: string;
  katexOptions?: Partial<KatexOptions>;
};

function KatexText({
  className,
  children = '',
  katexOptions,
  ...props
}: Props) {
  // States
  const [output, setOutput] = useState<string | null>(null);

  // Effects
  useEffect(() => {
    const output = katex.renderToString(children, {
      throwOnError: false,
      maxSize: 300,
      ...katexOptions,
    });

    setOutput(output);
  }, [children, katexOptions]);

  return null === output ? null : (
    <div
      className={clsx(['katex-content max-w-full', className])}
      dangerouslySetInnerHTML={{ __html: output }}
      {...props}
    />
  );
};

export default KatexText;
