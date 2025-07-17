// src/components/ui/Card3D.tsx
import { cn } from "../../utils/cn";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useState, type ReactNode } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    tags: string[];
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <CardTags tags={item.tags} />
            <CardLink link={item.link} />
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:border-slate-300 dark:group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-indigo-600 dark:text-indigo-400 font-bold tracking-wide mt-2 text-xl", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-slate-600 dark:text-slate-300 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardTags = ({
    tags,
    className
}: {
    tags: string[];
    className?: string
}) => {
    return (
        <div className={cn("flex flex-wrap gap-2 mt-4", className)}>
            {tags.map(tag => (
              <span key={tag} className="bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
            ))}
        </div>
    )
}

export const CardLink = ({
    link,
    className
}: {
    link: string;
    className?: string;
}) => {
    return (
        <a href={link} target="_blank" className={cn("text-slate-800 dark:text-white font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mt-6 self-start block", className)}>
            View on GitHub &rarr;
          </a>
    )
}