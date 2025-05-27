import { IoArrowBack, IoCalendarOutline } from "react-icons/io5";
import { usePaketShallow } from "./(providers)/PaketProvider";
import clsx from "clsx";
import Button from "@/components/basics/buttons/Button";
import { PaketCategory } from "@/types/models";
import Tabs, { TabNavItem } from "@/components/basics/Tabs";
import PaketSubtestList from "./PaketSubtestList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  category: PaketCategory;
  onBackPress?: () => void;
};

function PaketCategoryTabs({
  className,
  category: categoryProp,
  onBackPress,
  ...props
}: Props) {
  // Hooks
  const router = useRouter();

  const paket = usePaketShallow((state) => state.paket);

  // States
  const [category, setCategory] = useState<PaketCategory>(categoryProp);

  // Effects
  useEffect(() => {
    if (category.id !== categoryProp.id) {
      router.push(`/paket/${paket.id}/${category.id}`);      
    }
  }, [category]);

  // Vars
  const { categories = [] } = paket;
  const tabs = categories.map((item) => `category-${categories.indexOf(item)}`);
  const tabActive = `category-${categories.findIndex((item) => item.id === category.id)}`;

  return (
    <div className={clsx(["paket-category-tabs", className])} {...props}>
      <div className="flex gap-4">
        <Button
          className="hover:bg-gray-950/20"
          onClick={onBackPress}
        >
          <IoArrowBack />
        </Button>

        <div className="flex-1">
          <p className="text-sm opacity-50">{category.title}</p>
          <h1 className="text-xl font-bold">{category.name}</h1>
        </div>

        <Tabs
          tabsClassName="!p-0.5 bg-primary/20 rounded-xl"
          tabItemClassName={(_, index) => clsx([
            "!py-1 !rounded-xl text-sm font-semibold",
            tabs[index] === tabActive && "!text-white hover:bg-white/10",
            tabs[index] !== tabActive && "!text-primary hover:bg-primary/10",
          ])}
          indicatorClassName="!bg-primary !rounded-xl !h-[1.75rem]"
          tabs={categories.map((item, index): TabNavItem => {
            return {
              tab: `category-${index}`,
              label: item.title,
            };
          })}
          initialTab={`category-${categories.findIndex((item) => item.id === categoryProp.id)}`}
          onValueChange={(item) => {
            const [_, index] = item.split('-');

            setCategory(categories[+index]);
          }}
        />
      </div>

      <div className="mt-6">
        <PaketSubtestList category={category} />
      </div>
    </div>
  );
};

export default PaketCategoryTabs;
