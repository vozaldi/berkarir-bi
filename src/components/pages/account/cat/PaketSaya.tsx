'use client';

import clsx from "clsx";
import CATDisclaimerModal from "./CATDisclaimerModal";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/basics/buttons/Button";
import { QuizModel } from "@/types/models";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  quizzes?: QuizModel[];
};

function PaketSaya({
  className,
  quizzes = [],
  ...props
}: Props) {
  // States
  const [catModel, setCatModel] = useState<QuizModel | null>(null);

  return (
    <>
      <div className={clsx(["mt-4 grid grid-cols-12 gap-4", className])} {...props}>
        {quizzes.map((item) => (
          <div key={item.name} className="lg:col-span-4 md:col-span-6 col-span-12">
            <button
              className="text-left block w-full bg-card border border-dark-300 rounded-xl hover:border-blue-500 overflow-hidden"
              title={`Buka Paket - ${item.name}`}
              onClick={() => setCatModel(item)}
            >
              <Image
                // src={`/assets/images/products/product-1.jpg`}
                src={`https://picsum.photos/seed/${item.name}/512/256`}
                alt={item.name || `Image`}
                className="w-full h-40 object-cover"
                width={300}
                height={300}
              />

              <div className="pt-2 pb-4 px-3">
                <h3 className="text-lg font-bold">
                  {item.name}
                </h3>

                {!!item.quiz_type?.key && (
                  <div className="mt-1 flex gap-2">
                    <span className={clsx([
                      'px-2 py-0.5 rounded-md text-white text-xs',
                      ({
                        practice: 'bg-pink-500',
                        tryout: 'bg-cyan-500',
                      })[item.quiz_type.key || ''],
                    ])}>
                      {item.quiz_type.label}
                    </span>
                  </div>
                )}

                <Button
                  type="link"
                  href={`/account`}
                  className="block mt-3 w-full !rounded-full"
                  color="secondary"
                  size="sm"
                  onClick={(e) => e.preventDefault()}
                >
                  {`Buka Paket`}
                </Button>
              </div>
            </button>
          </div>
        ))}
      </div>

      <CATDisclaimerModal
        isVisible={!!catModel}
        onHide={() => setCatModel(null)}
        quiz={catModel}
      />
    </>
  );
};

export default PaketSaya;
