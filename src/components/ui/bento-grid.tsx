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
        "group/bento shadow-input row-span-1 flex flex-col rounded-xl border border-white/[0.2] bg-black transition duration-200 hover:shadow-xl shadow-none overflow-hidden",
        header ? "justify-between space-y-4 p-4 md:p-6" : "justify-center p-6 md:p-8",
        className,
      )}
    >
      {header}
      <div className={cn(
        "transition duration-200 group-hover/bento:translate-x-2 flex flex-col",
        !header && "space-y-3"
      )}>
        {icon}
        <div className={cn(
          "font-sans font-bold text-white break-words",
          header ? "mt-2 mb-2 text-lg md:text-xl line-clamp-2" : "text-xl md:text-2xl"
        )}>
          {title}
        </div>
        <div className={cn(
          "font-sans font-normal text-white/90 break-words",
          header ? "text-xs md:text-sm leading-snug" : "text-sm md:text-base leading-relaxed"
        )}>
          {description}
        </div>
      </div>
    </div>
  );
};
