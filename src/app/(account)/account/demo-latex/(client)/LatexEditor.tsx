'use client';

import AutodetectText from "@/components/basics/AutodetectText";
import TextField from "@/components/basics/forms/TextField";
import clsx from "clsx";
import { useState } from "react";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {

};

function LatexEditor({
  className,
  ...props
}: Props) {
  // States
  const [latex, setLatex] = useState('');

  return (
    <div className={clsx(['grid grid-cols-12 gap-6', className])} {...props}>
      <div className="col-span-6">
        <div className="p-4 rounded-lg bg-card shadow-md min-h-full">
          <h3 className="font-bold">{`Teks Kamu:`}</h3>

          <p></p>

          <TextField
            className="mt-4"
            InputComponent={
              <textarea
                className="w-full p-2 border border-gray-300 focus:outline-none rounded-lg"
                placeholder="Tulis LaTeX disini..."
                value={latex}
                onChange={(e) => setLatex(e.target.value)}
                rows={16}
              />
            }
          />
        </div>
      </div>

      <div className="col-span-6">
        <div className="p-4 rounded-lg bg-card shadow-md min-h-full flex flex-col">
          <h3 className="font-bold">{`Hasil HTML:`}</h3>

          {!latex ? (
            <p className="opacity-50 mt-4">
              <em>{`Hasil dari input kamu akan muncul di sini`}</em>
            </p>
          ) : (
            <AutodetectText
              className="mt-4"
              katexOptions={{
              }}
            >{latex}</AutodetectText>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatexEditor;
