import { cn } from "../../lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.2] bg-black p-4 md:p-6 transition duration-200 hover:shadow-xl shadow-none overflow-hidden",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2 overflow-hidden">
        {icon}
        <div className="mt-2 mb-3 font-sans font-bold text-xl md:text-2xl text-white break-words">
          {title}
        </div>
        <div className="font-sans text-sm md:text-base font-normal text-white/90 leading-relaxed break-words overflow-hidden">
          {description}
        </div>
      </div>
    </div>
  );
};
