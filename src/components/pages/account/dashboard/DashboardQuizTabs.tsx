'use client';

import Badge from "@/components/basics/Badge";
import Button from "@/components/basics/buttons/Button";
import Tabs, { TabNavItem } from "@/components/basics/Tabs";
import { useUiShallow } from "@/states/uiState";
import { QuizModel, QuizType } from "@/types/models";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoDocumentTextOutline, IoFileTrayFullOutline, IoFolderOpenOutline, IoList } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import CATDisclaimerModal from "../cat/CATDisclaimerModal";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  quizzes?: QuizModel[];
};

type TabData = {
  [key: string]: {
    quiz_type: QuizType;
    items: QuizModel[];
  };
};

function DashboardQuizTabs({
  className,
  quizzes = [],
  ...props
}: Props) {
  // Hooks
  const header = useUiShallow(state => state.layouts.header);

  // States
  const [tabActive, setTabActive] = useState<string>('all');
  const [catModel, setCatModel] = useState<QuizModel | null>(null);
  const [detail, setDetail] = useState<TabData>({
    all: {
      quiz_type: { key: 'all', label: `Semua Paket` },
      items: quizzes,
    },
  });

  // Effects
  useEffect(() => {
    const quizTypes = quizzes.reduce((a, b) => {
      const key = b.quiz_type?.key || 'other';

      if (!a[key]) {
        const quiz_type = b.quiz_type || { key: 'other', label: 'Lainnya' };

        a[key] = { quiz_type, items: [] };
      }

      a[key].items.push(b);

      return a;
    }, {} as TabData);

    setDetail(state => ({
      all: state.all,
      ...quizTypes,
    }));
  }, [quizzes]);

  // Vars
  const tabs: Array<typeof tabActive> = Object.keys(detail);
  const tabIcons: Record<string, IconType> = {
    all: IoList,
    practice: IoFileTrayFullOutline,
    tryout: IoDocumentTextOutline,
  };

  return (
    <div className={clsx(['flex flex-col gap-2', className])} {...props}>
      <Tabs
        style={{ top: header?.height }}
        className="sticky bg-background top-0 z-[100] rounded-lg"
        tabsClassName="!p-1 bg-primary/20 rounded-lg"
        tabItemClassName={(_, index) => clsx([
          "basis-1/3 rounded-lg",
          tabs[index] === tabActive && "!text-white hover:bg-white/10",
          tabs[index] !== tabActive && "!text-primary hover:bg-primary/10",
        ])}
        indicatorClassName="!bg-primary"
        initialTab="all"
        onValueChange={(value) => setTabActive(value)}
        tabs={Object.keys(detail).map((key): TabNavItem => {
          const Icon = tabIcons[key] || IoFolderOpenOutline;

          return {
            tab: key,
            label: (
              <div className="flex items-center gap-2">
                <Icon />
                <span className="font-semibold">{detail[key].quiz_type.label}</span>
              </div>
            ),
            props: {
              style: { flexBasis: !tabs.length ? '100%' : `calc(100% / ${tabs.length})` },
            },
          };
        })}
      />

      <div className="flex flex-col gap-2">
        {detail[tabActive]?.items.map((item) => (
          <Link
            key={item.name}
            href={`/paket/${item.id}`}
            className="bg-card flex items-start gap-3 p-2 shadow-sm hover:shadow-lg rounded-lg transition-shadow duration-200"
          >
            <Image
              // src={`/assets/images/products/product-1.jpg`}
              src={`https://picsum.photos/seed/${item.name?.replace('#', '')}/128/128`}
              alt={item.name || `Image`}
              className="w-20 h-20 object-cover rounded-lg"
              width={128}
              height={128}
            />

            <div className="flex-1 flex flex-col items-start">
              <h1 className="text-base font-bold">
                {item.name}
              </h1>

              <p className="text-xs opacity-75">{`Belum dikerjakan`}</p>

              <div className="mt-auto pt-2">
                <Badge
                  className={clsx([
                    "rounded-md",
                    item.quiz_type?.key === 'tryout' && "!bg-cyan-500",
                    item.quiz_type?.key === 'practice' && "!bg-pink-500",
                  ])}
                  color="info"
                  size="xs"
                >
                  {item.quiz_type?.label}
                </Badge>
              </div>
            </div>

            <div className="self-end">
              <Button
                className="cursor-pointer"
                color="primary"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();

                  setCatModel(item);
                }}
              >
                {`Buka Paket`}
              </Button>
            </div>
          </Link>
        ))}
      </div>

      <CATDisclaimerModal
        isVisible={!!catModel}
        onHide={() => setCatModel(null)}
        quiz={catModel}
        tahap={0}
      />
    </div>
  );
};

export default DashboardQuizTabs;
